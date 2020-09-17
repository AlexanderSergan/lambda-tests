/**
 * Dumb useragent headers which are required to deal with IG API
 * In particular, get userpic.
 */
export const userAgent = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 ' + 
    'like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) ' + 
    'Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS ' + 
    '12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)',
    accept: 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,ru;q=0.8,uk;q=0.7',
    'sec-ch-ua': '"\\Not;A\"Brand";v="99", "Google Chrome";v="85", "Chromium";v="85"',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',

    ':authority': 'www.instagram.com',
    ':method': 'GET',
    ':path': '/alkopoet/ ? __a = 1',
    ':scheme': 'https',
}