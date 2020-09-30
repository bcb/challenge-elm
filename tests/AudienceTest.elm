module AudienceTest exposing (..)

import Data.Audience
import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Json.Decode as Decode
import Test exposing (..)


suite : Test
suite =
    describe "Suite"
        [ describe "decode"
            [ test "success" <|
                \_ ->
                    Expect.ok
                        (Decode.decodeString Data.Audience.decoder Data.Audience.audiencesJSON)
            ]
        ]
