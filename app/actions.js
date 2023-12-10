const post = async (url, payload, token='')  => {
	const headers = {
		'Accept': 'application/json, text/plain, */*',
		'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
		'Content-Type': 'application/json',
		'X-ID_CANAL_VENTA': '2',
		'X-ID_IDIOMA': 'es',
		'X-ID_OFICINA': '999000',
		'X-ID_PROGRAMA': '1',
	}
	if (token !== ''){
		headers['Authorization'] = 'Bearer ' + token
	}
  const options ={method: "POST", headers: headers, body: JSON.stringify(payload)}

return fetch(url, options)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Something went wrong on API server!");
    }
  })
  .then((response) => {
    return response
  })
  .catch((error) => {
    console.error(error);
  });
}

const get = async (url) =>{
	const options ={method: "GET"}

	return fetch(url, options)
  .then((response) => {
    if (response.status === 200) {
      return response.text();
    } else {
      throw new Error("Something went wrong on API server!");
    }
  })
  .then((response) => {
    return response
  })
  .catch((error) => {
    console.error(error);
  });
}
