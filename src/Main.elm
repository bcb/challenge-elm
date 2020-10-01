module Main exposing (main)

import Browser
import Data.Audience as Audience
import Data.AudienceFolder as AudienceFolder
import Debug exposing (log)
import Html exposing (Html)
import Json.Decode as Decode


type alias LoadedModel =
    { audienceFolders : List AudienceFolder.AudienceFolder
    , audiences : List Audience.Audience
    , currentFolderId : Maybe Int
    , currentFolderName : String
    }


type Model
    = Success LoadedModel
    | Failure


init : Model
init =
    let
        audienceFoldersDecoded =
            Decode.decodeString AudienceFolder.decoder AudienceFolder.audienceFoldersJSON

        audiencesDecoded =
            Decode.decodeString Audience.decoder Audience.audiencesJSON
    in
    case ( audienceFoldersDecoded, audiencesDecoded ) of
        ( Ok audienceFolders, Ok audiences ) ->
            Success
                { audienceFolders = audienceFolders
                , audiences = audiences
                , currentFolderId = Nothing
                , currentFolderName = "Root"
                }

        ( Err _, _ ) ->
            Failure

        ( _, Err _ ) ->
            Failure


update : msg -> Model -> Model
update _ model =
    model


createFolder : Maybe Int -> String -> Html msg
createFolder _ name =
    Html.li [] [ Html.text name ]


view model =
    case log "model" model of
        Success result ->
            Html.div []
                [ createFolder result.currentFolderId result.currentFolderName
                , Html.ul []
                    (List.map
                        (\a -> createFolder (Just a.id) a.name)
                        result.audienceFolders
                    )
                ]

        Failure ->
            Html.text "Failed to parse JSON"


main =
    Browser.sandbox
        { init = init
        , update = update
        , view = view
        }
