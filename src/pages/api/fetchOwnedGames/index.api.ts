import axios, { type AxiosResponse } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import type { OwnedGamesApiResponse } from '@/libs/steam/api'
import { GET_OWNED_GAMES_API_URL } from '@/libs/steam/construct'
import convertPlayTimeToHours from '@/libs/steam/convertPlayTimeToHours'
import { generateSteamAppBannerUrl, generateSteamAppUrl } from '@/libs/steam/generateUrl'
import sortOwnedGames from '@/libs/steam/sortOwnedGames'

import type { FetchOwnedGamesResponse } from '.'

const fetchOwnedGamesHandler = (
  _req: NextApiRequest,
  res: NextApiResponse<FetchOwnedGamesResponse>,
) =>
  axios
    .get(GET_OWNED_GAMES_API_URL)
    .then((response: AxiosResponse<OwnedGamesApiResponse>) => {
      const { games, game_count } = response.data.response
      const ownedGames: FetchOwnedGamesResponse['ownedGames'] = sortOwnedGames(games).map(
        ({ appid, name, playtime_forever }) => ({
          appId: appid,
          appName: name,
          appUrl: generateSteamAppUrl(appid),
          bannerUrl: generateSteamAppBannerUrl(appid),
          playTimeInHours: convertPlayTimeToHours(playtime_forever),
        }),
      )
      res.status(200).json({ game_count, ownedGames })
    })
    .catch((error) => res.status(500).json(error))

export default fetchOwnedGamesHandler
