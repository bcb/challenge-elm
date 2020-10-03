module Data.AudienceFolder exposing
    ( AudienceFolder, audienceFoldersJSON
    , decoder, getParentId
    )

{-| Data.AudienceFolder module

This module implements everything related to audience folder resource.


# Interface

@docs AudienceFolder, audienceFoldersJSON

-}

import Json.Decode as Decode
import List.Extra exposing (find)



-- Type definition


{-| Basic type of AudienceFolder record
-}
type alias AudienceFolder =
    { id : Int
    , name : String
    , parent : Maybe Int
    }


decoder : Decode.Decoder (List AudienceFolder)
decoder =
    Decode.field "data"
        (Decode.list
            (Decode.map3 AudienceFolder
                (Decode.field "id" Decode.int)
                (Decode.field "name" Decode.string)
                (Decode.field "parent" (Decode.nullable Decode.int))
            )
        )


getParentId : Maybe Int -> List AudienceFolder -> Maybe Int
getParentId currentFolderId folders =
    case currentFolderId of
        Just folder ->
            case find (\a -> a.id == folder) folders of
                Just f ->
                    f.parent

                _ ->
                    Nothing

        _ ->
            Nothing



-- Fixtures


{-| Fixtures for audienceFolders
In real world something like this is returned by `GET /api/audience_folders`
-}
audienceFoldersJSON : String
audienceFoldersJSON =
    """
    {
        "data": [
            {
                "id": 357,
                "name": "Demographics",
                "curated": true,
                "parent": null
            },
            {
                "id": 358,
                "name": "Marketing Personas",
                "curated": true,
                "parent": null
            },
            {
                "id": 383,
                "name": "Reports",
                "curated": true,
                "parent": null
            },
            {
                "id": 3110,
                "name": "New Group",
                "curated": false,
                "parent": null
            },
            {
                "id": 3111,
                "name": "New Group 2",
                "curated": false,
                "parent": 3110
            }
        ]
    }
    """
