import _mock from '@/_mock';
import { randomNumberRange, randomInArray } from '@/_mock/funcs';

import { HOST_API } from '@/config'
import axios from '@/utils/axios';
import { API_SERVER } from '@/config'
import * as fetchTOOL from './tool'
// ----------------------------------------------------------------------


export async function peopleAmount ( setUseStateFunction: any = null ) {
  async function fetchPeopleAmount() {
    const fetchURL = `${API_SERVER}/people/getCount`
    console.log('-----------------')
    console.log(API_SERVER)
    console.log('-----------------')
    return fetch(fetchURL)
  }

  console.log('API SERVER: ', API_SERVER)
  if (setUseStateFunction === null) {
    return fetchPeopleAmount()
  } else {
    fetchPeopleAmount()
    .then(fetchTOOL.status)
    .then((response) => response.json())
    .then((json) => {
      setUseStateFunction(parseInt(json.count))
      })
    .catch(() => setUseStateFunction(null))
  }
}