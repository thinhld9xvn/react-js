<?php
    if ( ! function_exists('callAjaxResponse') ) :

        function callAjaxResponse($data) {

            header('Content-Type: application/json; charset: utf-8');

            echo json_encode($data);

            die();

        }

        function callAjaxResponseError() {

            callAjaxResponse(
                array('response' => 'error')
            );

        }

        function callAjaxResponseSuccess() {

            callAjaxResponse(
                array('response' => 'success')
            );

        }

    endif;