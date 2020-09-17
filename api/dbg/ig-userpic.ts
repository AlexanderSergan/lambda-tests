import { NowRequest, NowResponse } from '@vercel/node'
import fetch, { Headers } from 'node-fetch'
import { userAgent } from '../../utils/dumbHeaders'

const userpicHandler = async ({ query: { username = '', ig_id = '', rawResponse = '' } }: NowRequest, res: NowResponse) => {

    if (username == '' && ig_id == '') {
        return res.status(500).send('Neither username nor ig_id was provided.')
    }
    let userpic

    if (ig_id !== '') {
        try {

            if (typeof ig_id === 'string') {
                userpic = await getUserPicByIGId(ig_id)
            }
            return res.status(200).json(userpic)

        } catch (err) {  console.log('IG Id Error: ', err); return res.status(500).send('[Get Ig Userpic By ID] error error: ' + err) }
    }













    // let userpic
    try {

        if (typeof username === 'string') {

            if (rawResponse === 'true') {
                await getUserPic(username, res)
                return;
            }

            userpic = await getUserPic(username)
            console.log('[Get userpic by name]: nice')
        }

    } catch (err) {
        return res.status(500).send('Error error' + err)
    }
    // return res.send(500).send('Error error #2')

    return res.status(200).json(userpic)


}


export const getUserPicByIGId = async (ig_id: string): Promise<string> => {

    let igResponse
    let result

    const url = `https://i.instagram.com/api/v1/users/${ig_id}/info/`
    const headers = new Headers(userAgent)

    try {

        igResponse = await fetch(url, { headers })
        result = await igResponse.json()

        const { user: { profile_pic_url } } = result

        return profile_pic_url


    } catch (err) {
        console.log('[IG Get userpic by id] Error: ', err)
        throw new Error('Bad IG id')
    }

}

export const getUserPic = async (username: string, res?: NowResponse): Promise<string> => {

    console.log(`Userpic: got userpic request for name: ${username}`)
    const url = `https://www.instagram.com/${username}/?__a=1`

    let igResponce
    let userData
    try {
        console.log('Userpic: Making request at:', url)

        const headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': ' Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15' +
                ' (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; ' +
                'scale=2.00; 828x1792; 165586599)'
        })
        igResponce = await fetch(url, { headers })

        if (res) {
            res.status(222).send(await igResponce.text())

            return;
        }


        // const text = await igResponce.text()
        // console.log('Userpic: Responce: ', text)

        userData = await igResponce.text()
        console.log('Userpic: decoded data: ', userData)

        userData = JSON.parse(userData)

        console.log('Userpic: everything normal: ', !!userData.graphql.user.profile_pic_url_hd)

    } catch (err) {

        console.error('Some error catched', err)
    }

    console.log('Userpic: everything normal: ', !!userData.graphql.user.profile_pic_url_hd)

    // console.log(userData)
    const { graphql: { user: { profile_pic_url_hd } } } = userData

    console.log('Userpic: address: ', profile_pic_url_hd)

    return profile_pic_url_hd


}

export default userpicHandler