import express from "express";
import User from "../models/user.model.js"; 
import generateResponse from "../controllers/question.controller.js"; 

const questionRoutes = express.Router();

questionRoutes.post("/question", async (req, res) => {
  const { question } = req.body;
  console.log('Recibida la pregunta:', question);

  try {
    // Normalizar la pregunta a minúsculas y buscar palabras clave
    const normalizedQuestion = question.toLowerCase().trim();
    const usersKeyword = "usuarios que empiezan con p";

    // Comprobar si la pregunta está relacionada con usuarios que empiezan con 'P'
    if (normalizedQuestion.includes("usuarios") && normalizedQuestion.includes("empiezan con p")) {
      console.log("Buscando usuarios que empiezan con 'P'...");
      const startTime = Date.now();  // Medir tiempo de la consulta

      // Buscar usuarios cuyo nombre de usuario o nombre completo empieza con "P"
      const users = await User.find({
        $or: [
          { username: { $regex: "^P", $options: "i" } }, // Búsqueda insensible a mayúsculas
          { fullName: { $regex: "^P", $options: "i" } }  // Búsqueda insensible a mayúsculas
        ]
      });

      console.log("Usuarios encontrados:", users);
      const elapsedTime = Date.now() - startTime;
      console.log(`Tiempo para la consulta a MongoDB: ${elapsedTime}ms`);

      if (users.length > 0) {
        const userNames = users.map(user => user.fullName || user.username);
        const context = `Los usuarios que empiezan con 'P' son: ${userNames.join(", ")}`;
        console.log("Contexto para Gemini:", context);

        // Generar respuesta con Gemini
        const response = await generateResponse(context, question);
        console.log("Respuesta de Gemini:", response);

        return res.json({ question, response });
      } else {
        return res.json({ question, response: "No se encontraron usuarios que comiencen con la letra 'P'." });
      }
    } else {
      return res.json({ question, response: "La pregunta no está relacionada con los usuarios." });
    }
  } catch (error) {
    console.error("Error al procesar la pregunta:", error);
    return res.status(500).json({ error: "Error al procesar la pregunta." });
  }
});

export default questionRoutes;
