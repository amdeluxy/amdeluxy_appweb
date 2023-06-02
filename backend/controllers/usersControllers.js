import generarId from "../helpers/generarid.js";
import Usuario from "../models/Usuario.js";



const register = async (req, res ) => {
    // Avoid duplicate registration

    const { email } = req.body;
    const existUser = await Usuario.findOne({ email });

    if (existUser) {
        const error = new Error("The User is Registered");
        return res.status(400).json({ msg: error.message});
    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        const userStored = await usuario.save();
        res.json(userStored);
    } catch (error) {
        console.log(error);
    }
    
    
};
const auth = async (req, res ) => {
    const { email, password } = req.body;

    // Check if user exist
    
    const usuario = await Usuario.findOne({ email });
    if ( !usuario ) {
        const error = new Error("The user no exist");
        return res.status(404).json({ msg: error.message });
    }

    // check if user is confirmed 
    if ( !usuario.confirmed ) {
        const error = new Error("Your Account is no confirmed");
        return res.status(403).json({ msg: error.message });
    }

    // Check your password 
    if ( await usuario.checkPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id),
        })
    } else {
        const error = new Error("The Password Incorrect");
        return res.status(403).json({ msg: error.message });
    }

}

export { register, auth };

