import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{ //le asignamos un token a casa userId
        expiresIn: "15d" //Ponemos una fecha de expiración, pa que no pase como en Kick
    })

    res.cookie("jwt",token,{ //Mandamos una cookie al navegador
        maxAge: 15*24*60*60*1000, //Tenemos que setear los 15 días de expiración en milisegundos - 15d*24h*60min*60s*1000ms
        httpOnly: true, //Evitamos que el token(cookie en este caso) sea accesible a través de js y solo la lea el server para prevenir ataques (XSS)
        sameSite: "strict",// La cookie solo se envía si la solicitud proviene del mimsmo sitio. Para prevenir Cross site request forgery (CSRF) otro tipo de ataque, evita que cuando el user esté logeado se ejecuten acciones no buscadas
        secure: process.env.NODE_ENV !== "development", //Solo en producción las cookies se envían con HTTPS
    })
}