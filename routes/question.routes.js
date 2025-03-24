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
    console.log('Pregunta normalizada:', normalizedQuestion);

    // Comprobar si la pregunta está relacionada con usuarios que empiezan con una letra
    if (normalizedQuestion.includes("usuarios") && normalizedQuestion.includes("empiezan con")) {
      console.log("Buscando usuarios que empiezan con alguna letra...");

      // Extraer la letra de la pregunta (la que sigue a "empiezan con")
      const match = normalizedQuestion.match(/empiezan con (\w)/);

      if (match && match[1]) {
        const letter = match[1].toUpperCase();  // Letra que estamos buscando
        console.log(`Buscando usuarios cuyo atributo empieza con la letra '${letter}'...`);

        // Buscar usuarios cuyo nombre de usuario o nombre completo empieza con esa letra
        const users = await User.find({
          $or: [
            { username: { $regex: `^${letter}`, $options: "i" } }, // Búsqueda insensible a mayúsculas
            { fullName: { $regex: `^${letter}`, $options: "i" } }  // Búsqueda insensible a mayúsculas
          ]
        });

        console.log("Usuarios encontrados:", users);

        if (users.length > 0) {
          // Incluir también los correos de los usuarios
          const userDetails = users.map(user => ({
            name: user.fullName || user.username, // Nombre o nombre de usuario
            email: user.email  // Correo electrónico
          }));

          const context = `Los usuarios que empiezan con '${letter}' son: ${userDetails.map(u => `${u.name} (${u.email})`).join(", ")}`;
          console.log("Contexto para Gemini:", context);

          // Generar respuesta con Gemini
          const response = await generateResponse(context, question);
          console.log("Respuesta de Gemini:", response);

          return res.json({ question, response });
        } else {
          return res.json({ question, response: `No se encontraron usuarios que comiencen con la letra '${letter}'.` });
        }
      } else {
        return res.json({ question, response: "No se pudo extraer la letra de la pregunta." });
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
