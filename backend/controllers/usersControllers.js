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
        const userStored = await usuario.save();
        res.json(userStored);
    } catch (error) {
        console.log(error);
    }
    
    
};


export { register };

