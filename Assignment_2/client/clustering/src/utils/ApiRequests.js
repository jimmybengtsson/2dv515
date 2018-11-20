import axios from 'axios'

let serverURL = 'http://localhost:8000/'

/**
 *  Functions to make API-requests to the server.
 *
 */
export const getBlogData = () => {

  return axios({
    method: 'get',
    url: serverURL + 'blogdata',
    headers: {'Content-Type': 'application/json'}
  })
}
