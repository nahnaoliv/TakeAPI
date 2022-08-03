const axios = require('axios')

module.exports = {
  async GetGithub(req, response) {
    await axios
      .get('https://api.github.com/users/takenet/repos')
      .then(function (resposta) {
        let res = []

        resposta.data.sort(function (dataatual, datafutura) {
          if (dataatual.created_at > datafutura.created_at) {
            return 1
          } else if (dataatual.created_at < datafutura.created_at) {
            return -1
          } else {
            return 0
          }
        })
        
        for (let i in resposta.data) {
          if (res.length >= 5) {
            break
          }
          linguagem(resposta.data[i].owner.login, resposta.data[i].name)
            ? res.push({
                name: resposta.data[i].full_name,
                img: resposta.data[i].owner.avatar_url,
                descricao: resposta.data[i].description,
              })
            : null
        }
        return response.send(res)
      })
      .catch((err) => {
        response.json({ msg: 'Perfil nao encontrado! ' + err })
      })
  }
}

const linguagem = async (name, repo) => {
  let response = false
  await axios
    .get('https://api.github.com/repos/' + name + '/' + repo + '/languages')
    .then((e) => {
      response = Object.keys(e).includes('C#')
    })
    .catch((error) => {
      console.log('Erro de chamada de api' + error)
      
    })

  return response
}
