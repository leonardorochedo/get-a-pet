const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

// Helpers
const createUserToken = require('../helpers/create-use-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {

    static async register(req, res) {
        
        const {name, email, phone, password, confirmpassword} = req.body

        // Validations
        if(!name) {
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }

        if(!email) {
            res.status(422).json({message: 'O e-mail é obrigatório'})
            return
        }

        if(!phone) {
            res.status(422).json({message: 'O telefone é obrigatório'})
            return
        }

        if(!password) {
            res.status(422).json({message: 'A senha é obrigatória'})
            return
        }

        if(!confirmpassword) {
            res.status(422).json({message: 'A confirmação de senha é obrigatória'})
            return
        }

        // check if passwords match
        if(password !== confirmpassword) {
            res.status(422).json({message: 'As senhas não batem!'})
            return
        }

        // check if user exists
        const userExists = await User.findOne({email: email})

        if(userExists) {
            res.status(422).json({message: 'Por favor, utilize outro e-mail!'})
            return
        }

        // create a password encrypted
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // create user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save() // isert newUser
            
            // login user
            await createUserToken(newUser, req, res)
        } catch(err) {
            res.status(500).json({message: error})
        }
    }

    static async login(req, res) {

        const {email, password} = req.body

        // Validations
        if(!email) {
            res.status(422).json({message: 'O e-mail é obrigatório'})
            return
        }

        if(!password) {
            res.status(422).json({message: 'A senha é obrigatória'})
            return
        }

        // check if user exists
        const user = await User.findOne({email: email})

        if(!user) {
            res.status(422).json({message: 'Não há usuário cadastrado com esse email!'})
            return
        }

        // check if password match
        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch) {
            res.status(422).json({message: 'Senha inválida!'})
            return
        }

        // login user
        await createUserToken(user, req, res)
        
    }

    static async checkUser(req, res) {
        // check if user authenticate
        let currentUser

        if(req.headers.authorization) {

            const token = getToken(req) // get a token from req
            const decoded = jwt.verify(token, 'nossosecret') // verify if token is valid with secret

            currentUser = await User.findById(decoded.id) // get a user for id in token

            currentUser.password = undefined

        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)

    }

    static async getUserById(req, res) {

        const id = req.params.id

        // get a user by id -password
        const user = await User.findById(id).select('-password')

        // check if user not exist
        if(!user) {
            res.status(422).json({message: 'Usuário não encontrado!'})
            return
        }

        res.status(200).json({ user })
    }

    static async editUser(req, res) {
        
        const id = req.params.id

        // check if user exist
        const token = getToken(req)
        const user = await getUserByToken(token)

        const {name, email, phone, password, confirmpassword} = req.body

        let image = ''

        // validations
        if(!name) {
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }

        user.name = name

        if(!email) {
            res.status(422).json({message: 'O e-mail é obrigatório'})
            return
        }

        const userExistis = await User.findOne({email: email}) // search for user in mongo

        // check if email has already taken
        if(user.email !== email && userExistis) {
            res.status(422).json({message: 'Por favor, utiliza outro e-mail!'})
            return
        }

        user.email = email

        if(!phone) {
            res.status(422).json({message: 'O telefone é obrigatório!'})
            return
        }

        user.phone = phone

        if(password != confirmpassword) {
            res.status(422).json({message: 'As senhas são conferem!'})
            return
        } else if(password === confirmpassword && password != null) {

            // creating password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        try {
            // returns user updated data
            await User.findOneAndUpdate(
                {_id: user.id}, // where
                {$set: user}, // new data
                {new: true} // formating data
            )

            res.status(200).json({
                message: "Usuáriuo atualizado com sucesso!"
            })
        } catch (err) {
            res.status(500).json({message: err})
            return
        }

    }
}