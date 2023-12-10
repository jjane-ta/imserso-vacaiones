console.log("getData script load")



const init = async () => {
  // getOrigen()
  const origen = 337
  const plazas = 1
  const transporte = true
  data = await getData(origen, plazas, transporte)
  data = parseData(data)
  
  initTable(data)
}

const getData = async (origen, plazas, transporte) => {
  const login = await getToken()
	url = "https://api.turismosocial.com/proceso-reserva-ws/rest/disponibilidad"
	payload = {
    "origen": origen,
    "modalidad": "",
    "zona": "",
    "plazas": plazas,
    "transpIncl": transporte}
  data = []
  for (const modalidad of Array(2).keys()) {
    payload.modalidad = modalidad + 1 + ''
    for (const zona of Array(81).keys()) {
      payload.zona = zona + 1  + ''
      data = data.concat(await post(url, payload, login.token))
    }
  }
  // console.log(data)
  return data
}

const parseData = (data) => {
  var new_data = []
  data.forEach(element => {
    item = element.disponibilidadSalidaInfos
    item.map( e => e['estado'] = element.estado)
    new_data = new_data.concat(item)
  });

  new_data = new_data.map(e => {
    new_element = {
      'Fecha': e.fechaSalida,
      'duracion' : e.duracionViaje,
      'destino' : e.destino,
      'plazasIndividual': e.plazasIndividual,
      'precioSalida' : e.precioSalida,
      'plazas' : e.plazasDisponibles,
      'lista': e.plazasListaEspera ,
      'transporte': e.tieneTransporte,
      'estado': e.estado
    }
    for (const[k, v] of Object.entries(new_element)){new_element[k] = v +''}
    return new_element
  })

  // console.log('new', new_data)
  return new_data
}


const getToken = async () => {
  url = "https://api.turismosocial.com/proceso-reserva-ws/auth/auth/login"
  payload ={"username": "api_aa@turismosocial.com","password": "Test.4321"}
  return await post(url, payload)
 }

const getOrigen = async () => {
  url = "https://reservasacc.turismosocial.com/"
  const html = await get(url)
  const parser = new DOMParser();
  const parsed = parser.parseFromString(html, "text/html");
  console.log(JSON.parse(parsed.getElementById('__NEXT_DATA__').innerText).props.pageProps.origins);

}