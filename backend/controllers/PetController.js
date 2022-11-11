const Pet = require('../models/Pet')

// helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {
    static async create(req, res) {
        
        const {name, age, weight, color} = req.body

        const images = req.files

        const available = true

        // images

        // validations
        if(!name) {
            res.status(422).json({
                message: 'O nome é obrigatório!'
            })
        }

        if(!age) {
            res.status(422).json({
                message: 'A idade é obrigatório=a!'
            })
        }

        if(!weight) {
            res.status(422).json({
                message: 'O peso é obrigatório!'
            })
        }

        if(!color) {
            res.status(422).json({
                message: 'A cor é obrigatória!'
            })
        }

        if(images.length === 0) {
            res.status(422).json({
                message: 'A imagem é obrigatória!'
            })
        }

        // get a user owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        // create a pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: { // passando o dono do pet
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save() // salvando no banco
            res.status(201).json({
                message: 'Pet cadastrado com sucesso!',
                newPet, // mandando pro front
            })
        } catch (err) {
            res.status(500).json({
                message: err
            })
        }

    }

    static async getAll(req, res) {

        // coletando os pets do banco e ordenando com o sort()
        const pets = await Pet.find().sort('-createdAt')

        // mandando os pets para o front
        res.status(200).json({
            pets
        })

    }

    static async getAllUserPets(req, res) {

        // get user by token
        const token = getToken(req)
        const user = await getUserByToken(token)

        // get a pet with filter where in especific document in mongo
        const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')

        // send to frontend
        res.status(200).json({
            pets
        })
    }

    static async getAllUserAdoptions(req, res) {
        // get user by token
        const token = getToken(req)
        const user = await getUserByToken(token)

        // get a pet with filter where in especific document in mongo
        const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt')

        // send to frontend
        res.status(200).json({
            pets
        })
    }

    static async getPetById(req, res) {

        const id = req.params.id

        // verify ID
        if(!ObjectId.isValid(id)) {
            res.status(422).json({
                message: 'ID inválido'
            })
            return
        }

        // check if pet exists
        const pet = await Pet.findById(id)

        if(!pet) {
            res.status(404).json({
                message: 'O Pet não existe!'
            })
            return
        }

        res.status(200).json({
            pet
        })
    }

    static async removePetById(req, res) {
        const id = req.params.id

        // verify ID
        if(!ObjectId.isValid(id)) {
            res.status(422).json({
                message: 'ID inválido'
            })
            return
        }

        // check if pet exists
        const pet = await Pet.findById(id)

        if(!pet) {
            res.status(404).json({
                message: 'O Pet não encontrado!'
            })
            return
        }

        // check if logged in user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        // userID != petUserID
        if(user._id.toString() !== pet.user._id.toString()) {
            res.status(422).json({
                message: 'Houve um problema ao processar sua solicitação, tente novamente mais tarde!'
            })
            return
        }

        try {
            await Pet.findByIdAndDelete(id)
            res.status(200).json({
                message: 'Pet deletado com sucesso!'
            })
        } catch (err) {
            res.status(422).json({
                message: err
            })
        }
    }

    static async updatePet(req, res) {

        const id = req.params.id

        const {name, age, weight, color, available} = req.body

        const images = req.files

        const updatedData = {}

        // check if pet exists
        const pet = await Pet.findById(id)

        if(!pet) {
            res.status(404).json({
                message: 'O Pet não encontrado!'
            })
            return
        }

        // check if logged in user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        // userID != petUserID
        if(user._id.toString() !== pet.user._id.toString()) {
            res.status(422).json({
                message: 'Houve um problema ao processar sua solicitação, tente novamente mais tarde!'
            })
            return
        }

        // validations
        if(!name) {
            res.status(422).json({
                message: 'O nome é obrigatório!'
            })
        } else {
            updatedData.name = name
        }

        if(!age) {
            res.status(422).json({
                message: 'A idade é obrigatório=a!'
            })
        } else {
            updatedData.age = age
        }

        if(!weight) {
            res.status(422).json({
                message: 'O peso é obrigatório!'
            })
        } else {
            updatedData.weight = weight
        }

        if(!color) {
            res.status(422).json({
                message: 'A cor é obrigatória!'
            })
        } else {
            updatedData.color = color
        }

        if(images.length === 0) {
            res.status(422).json({
                message: 'A imagem é obrigatória!'
            })
        } else {
            updatedData.images = []

            // adicionando o nome de cada imagem ao array
            images.map((image) => {
                updatedData.images.push(image.filename)
            })
        }

        try {
            await Pet.findByIdAndUpdate(id, updatedData)
            res.status(200).json({
                message: 'Pet atualizado com sucesso!'
            })
        } catch (err) {
            res.status(422).json({
                message: err
            })
        }
    }
}