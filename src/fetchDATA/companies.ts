import _mock from '@/_mock';
import { randomNumberRange, randomInArray } from '@/_mock/funcs';

import axios from '@/utils/axios';
import { PORT, HOST_API, API_SERVER } from '@/config'
import * as fetchTOOL from './tool'

import useLocales from '@/hooks/useLocales';
// ----------------------------------------------------------------------
const fetchURL_companyProfile = `${API_SERVER}/companies/profile/`
const fetchURL = `${API_SERVER}/companies/getCount`

export function companiesGetStatusShow(inStatusReal:boolean) {
  switch (inStatusReal) {
    case true: 
      return 'suitable'
    case false:
      return 'unsuitable'
    case null:
      return 'none'
  }
}  

export async function companiesList( setUseStateFunction: any = null ) {
  const fetchURL_companiesList:string = `${API_SERVER}/ping`

  async function fetchCompaniesList() {
    return fetch(fetchURL_companiesList)
  }

  if (setUseStateFunction === null) {
    return await fetchCompaniesList()
  } else {
    fetchCompaniesList()
    .then(fetchTOOL.status)
    .then((response) => response.json())
    .then((json) => {
      setUseStateFunction(
        json.map((curRow: any, index: any) => ({
          index: index,
          id: curRow.id,
          uuid: curRow.uuid,
          // avatarUrl: _mock.image.avatar(2),
          // name: _mock.name.fullName(index),
          name: curRow.name,
          email: _mock.email(index),
          phoneNumber: _mock.phoneNumber(index),
          address: '908 Jack Locks',
          country: _mock.address.country(index),
          state: 'Virginia',
          city: 'Rancho Cordova',
          zipCode: '85807',
          companySize: curRow.company_size,
          // company: _mock.company(index),
          company: curRow.company_size,
          isVerified: _mock.boolean(index),
          status: companiesGetStatusShow(curRow.complies_parameters),
          role: _mock.role(index),
        }))
      )
      })
    .catch(() => setUseStateFunction(null))
  }
} 

export async function companyProfile( setUseStateFunction: any = null, uuid: string) {

  async function fetchCompanyProfile(uuid:string) {
    return fetch(fetchURL_companyProfile + uuid,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  if (setUseStateFunction === null) {
    return await fetchCompanyProfile(uuid)
  } else {
    fetchCompanyProfile(uuid)
    .then(fetchTOOL.status)
    .then((response) => response.json())
    .then((json) => { setUseStateFunction(json) })
  }
}

export async function companiesAmount ( setUseStateFunction: any = null ) {
  async function fetchCompaniesAmount() {
    console.log('-----------------')
    console.log('TTTT:', process.env.TTTT)
    console.log('HOST:', process.env.HOST)
    console.log('PORT:', process.env.PORT)
    console.log('HOST_API:', process.env.HOST_API)
    console.log('-----------------')
    return fetch(fetchURL)
  }

  console.log('API SERVER: ', API_SERVER)
  if (setUseStateFunction === null) {
    return fetchCompaniesAmount()
  } else {
    fetchCompaniesAmount()
    .then(fetchTOOL.status)
    .then((response) => response.json())
    .then((json) => {
      setUseStateFunction(parseInt(json.count))
      })
    .catch(() => setUseStateFunction(null))
  }
} 


export const _companiesList = () => {
  const companiesList = fetch(`${HOST_API}/api/ping`)
    .then((response) => response.json())
    .then((json) => console.log(json))

  // console.log(response.json())
  // console.log(companiesList)
    
  return [...Array(24)].map((_, index) => ({
    id: _mock.id(index),
    avatarUrl: _mock.image.avatar(index),
    // name: _mock.name.fullName(index),
    name: 'test name',
    email: _mock.email(index),
    phoneNumber: _mock.phoneNumber(index),
    address: '908 Jack Locks',
    country: _mock.address.country(index),
    state: 'Virginia',
    city: 'Rancho Cordova',
    zipCode: '85807',
    company: _mock.company(index),
    isVerified: _mock.boolean(index),
    status: randomInArray(['active', 'banned']),
    role: _mock.role(index),
  }))
}

// export const _userAbout = {
//   id: _mock.id(1),
//   cover: _mock.image.cover(1),
//   position: 'UI Designer',
//   follower: randomNumberRange(999, 99999),
//   following: randomNumberRange(999, 99999),
//   quote: 'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
//   country: _mock.address.country(1),
//   email: _mock.email(1),
//   company: _mock.company(1),
//   school: _mock.company(2),
//   role: 'Manager',
//   facebookLink: `https://www.facebook.com/caitlyn.kerluke`,
//   instagramLink: `https://www.instagram.com/caitlyn.kerluke`,
//   linkedinLink: `https://www.linkedin.com/in/caitlyn.kerluke`,
//   twitterLink: `https://www.twitter.com/caitlyn.kerluke`,
// };

// export const _userFollowers = [...Array(18)].map((_, index) => ({
//   id: _mock.id(index),
//   avatarUrl: _mock.image.avatar(index),
//   name: _mock.name.fullName(index),
//   country: _mock.address.country(index),
//   isFollowed: _mock.boolean(index),
// }));

// export const _userFriends = [...Array(18)].map((_, index) => ({
//   id: _mock.id(index),
//   avatarUrl: _mock.image.avatar(index),
//   name: _mock.name.fullName(index),
//   role: _mock.role(index),
// }));

// export const _userGallery = [...Array(12)].map((_, index) => ({
//   id: _mock.id(index),
//   title: _mock.text.title(index),
//   postAt: _mock.time(index),
//   imageUrl: _mock.image.cover(index),
// }));

// export const _userFeeds = [...Array(3)].map((_, index) => ({
//   id: _mock.id(index),
//   author: {
//     id: _mock.id(8),
//     avatarUrl: _mock.image.avatar(1),
//     name: 'Caitlyn Kerluke',
//   },
//   isLiked: true,
//   createdAt: _mock.time(index),
//   media: _mock.image.feed(index),
//   message: _mock.text.sentence(index),
//   personLikes: [...Array(36)].map((_, index) => ({
//     name: _mock.name.fullName(index),
//     avatarUrl: _mock.image.avatar(index + 2),
//   })),
//   comments: (index === 2 && []) || [
//     {
//       id: _mock.id(7),
//       author: {
//         id: _mock.id(8),
//         avatarUrl: _mock.image.avatar(randomInArray([2, 3, 4, 5, 6]) || 2),
//         name: _mock.name.fullName(index + 5),
//       },
//       createdAt: _mock.time(2),
//       message: 'Praesent venenatis metus at',
//     },
//     {
//       id: _mock.id(9),
//       author: {
//         id: _mock.id(10),
//         avatarUrl: _mock.image.avatar(randomInArray([7, 8, 9, 10, 11]) || 7),
//         name: _mock.name.fullName(index + 6),
//       },
//       createdAt: _mock.time(3),
//       message:
//         'Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.',
//     },
//   ],
// }));

// export const _userCards = [...Array(24)].map((_, index) => ({
//   id: _mock.id(index),
//   avatarUrl: _mock.image.avatar(index),
//   cover: _mock.image.cover(index),
//   name: _mock.name.fullName(index),
//   follower: randomNumberRange(999, 99999),
//   following: randomNumberRange(999, 99999),
//   totalPost: randomNumberRange(999, 99999),
//   position: _mock.role(index),
// }));

// export const _userPayment = [...Array(2)].map((_, index) => ({
//   id: _mock.id(index),
//   cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
//   cardType: ['master_card', 'visa', 'master_card'][index],
// }));

// export const _userAddressBook = [...Array(4)].map((_, index) => ({
//   id: _mock.id(index),
//   name: _mock.name.fullName(index),
//   phone: _mock.phoneNumber(index),
//   country: _mock.address.country(index),
//   state: 'New Hampshire',
//   city: 'East Sambury',
//   street: '41256 Kamille Turnpike',
//   zipCode: '85807',
// }));

// export const _userInvoices = [...Array(10)].map((_, index) => ({
//   id: _mock.id(index),
//   createdAt: _mock.time(index),
//   price: _mock.number.price(index),
// }));

// export const _companiesList = [...Array(24)].map((_, index) => ({
//   id: _mock.id(index),
//   avatarUrl: _mock.image.avatar(index),
//   name: _mock.name.fullName(index),
//   email: _mock.email(index),
//   phoneNumber: _mock.phoneNumber(index),
//   address: '908 Jack Locks',
//   country: _mock.address.country(index),
//   state: 'Virginia',
//   city: 'Rancho Cordova',
//   zipCode: '85807',
//   company: _mock.company(index),
//   isVerified: _mock.boolean(index),
//   status: randomInArray(['active', 'banned']),
//   role: _mock.role(index),
// }));
