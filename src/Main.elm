module Main exposing (main)

import Browser
import Data.Audience as Audience
import Data.AudienceFolder as AudienceFolder
import FeatherIcons
import Html exposing (Html)
import Html.Attributes exposing (class, classList, style)
import Html.Events exposing (onClick)
import Json.Decode as Decode


type alias LoadedModel =
    { audienceFolders : List AudienceFolder.AudienceFolder
    , audiences : List Audience.Audience
    , currentFolderId : Maybe Int
    , currentAudienceType : Audience.AudienceType
    }


type Model
    = Success LoadedModel
    | Failure


type Msg
    = SetFolder (Maybe Int)
    | SetType Audience.AudienceType


init : Model
init =
    case
        ( Decode.decodeString AudienceFolder.decoder AudienceFolder.audienceFoldersJSON
        , Decode.decodeString Audience.decoder Audience.audiencesJSON
        )
    of
        ( Ok audienceFolders, Ok audiences ) ->
            Success
                { audienceFolders = audienceFolders
                , audiences = audiences
                , currentFolderId = Nothing -- Root folder
                , currentAudienceType = Audience.Authored
                }

        _ ->
            Failure


update : Msg -> Model -> Model
update msg model =
    case model of
        Success loadedModel ->
            case msg of
                SetFolder id ->
                    Success { loadedModel | currentFolderId = id }

                SetType type_ ->
                    Success { loadedModel | currentFolderId = Nothing, currentAudienceType = type_ }

        Failure ->
            model


showAudienceType : String -> Audience.AudienceType -> Audience.AudienceType -> Html Msg
showAudienceType name type_ currentAudienceType =
    Html.button
        [ classList [ ( "button", True ), ( "selected", type_ == currentAudienceType ) ], onClick (SetType type_) ]
        [ Html.text name ]


showUpFolder : Maybe Int -> Maybe Int -> Html Msg
showUpFolder currentFolderId parentFolderId =
    case currentFolderId of
        Just _ ->
            Html.button
                [ class "entry", class "parent", onClick (SetFolder parentFolderId) ]
                [ FeatherIcons.arrowLeft
                    |> FeatherIcons.toHtml
                        [ style "vertical-align" "middle"
                        , style "display" "inline-block"
                        ]
                , Html.span [ class "text" ] [ Html.text "Up" ]
                ]

        Nothing ->
            Html.text ""


showAudienceFolder : Int -> String -> Html Msg
showAudienceFolder id name =
    Html.button
        [ class "entry", class "audienceFolder", onClick (SetFolder (Just id)) ]
        [ FeatherIcons.folder
            |> FeatherIcons.toHtml
                [ style "vertical-align" "middle"
                , style "display" "inline-block"
                ]
        , Html.span [ class "text" ] [ Html.text name ]
        ]


showAudience : String -> Html Msg
showAudience name =
    Html.button
        [ class "entry", class "audience" ]
        [ Html.span [ class "text" ] [ Html.text name ] ]


view model =
    case model of
        Success m ->
            Html.div []
                [ Html.div [ class "buttons" ]
                    [ showAudienceType "Authored" Audience.Authored m.currentAudienceType
                    , showAudienceType "Shared" Audience.Shared m.currentAudienceType
                    , showAudienceType "Curated" Audience.Curated m.currentAudienceType
                    ]
                , Html.ul []
                    (let
                        parentFolderId =
                            AudienceFolder.getParentId m.currentFolderId m.audienceFolders

                        audienceFolders =
                            List.filter (\a -> a.parent == m.currentFolderId) m.audienceFolders

                        audiences =
                            List.filter (\a -> a.folder == m.currentFolderId && a.type_ == m.currentAudienceType) m.audiences
                     in
                     List.concat
                        [ List.singleton (showUpFolder m.currentFolderId parentFolderId)
                        , if m.currentAudienceType /= Audience.Shared then
                            List.map (\a -> showAudienceFolder a.id a.name) audienceFolders

                          else
                            []
                        , List.map (\a -> showAudience a.name) audiences
                        ]
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
