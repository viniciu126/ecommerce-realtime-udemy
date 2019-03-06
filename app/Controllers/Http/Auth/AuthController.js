'use strict'

const User = use('App/Models/User')
const Role = use('Role')

class AuthController {

    async register({ request, response }) {
        //obtem os dados da request
        const { name, surname, email, password } = request.all() // request.body
        
        //cria o usuário
        const user = await User.create({ name, surname, password, email })

        //Encontra o usuário pelo slug
        const userRole = await Role.findBy('slug', 'client')

        //Associa o userRole ao user
        await user.roles().attach([userRole.id])
        
        //retorna a response status(201) informa que foi criado
        //send({ data: user }) passa os dados do usuário
        return response.status(201).send({ data: user })

        //Outra forma de retornar
        //response.status(201)
        //return user
    }

    async login({ request, auth, response }) {
        //obtem os dados da request
        const { email, password } = request.all()

        //valida
        const user = await auth.withRefreshToken().attempt(email, password)
        
        //retorna sucesso
        return response.send({data: user})
    }

    async refresh({ request, response, auth }) {
        const refresh_token = request.input('refresh_token')

        if (!refresh_token) {
            refresh_token = request.header('refresh_token')
        }

        const user = await auth
            .newRefreshToken()
            .generateForRefreshToken(refresh_token)
        
        return response.send({ data:user })
    }

    async logout({ request, response, auth }) {
        const refresh_token = request.input('refresh_token');

        if (!refresh_token) {
          refresh_token = request.header('refresh_token');
        }

        const user = await auth
            .authenticator('jwt')
            .revokeTokens([refresh_token], true)

        return response.send({data:user})
    }


}

module.exports = AuthController
