<?php
    function removeUrlAllParameters( $url ) {

        $request_uri = $url;

        $parsed = parse_url($request_uri);

        //print_r( $parsed); die();
        
        /*if ( array_key_exists('query', $parsed) ) :

            $query = $parsed['query'];

            parse_str($query, $params);  

            //print_r( $params); die();

            foreach ($params as $key => $value) :

                unset($params[$key]);
                
            endforeach;     

            print_r( $params); die();       

            $string = http_build_query($params);

            return $string;

        endif;        */

        return $parsed['path'];

    }

    function getUrlLastPath( $url ) {

        $request_uri = removeUrlAllParameters( $url );

        $uris = explode( '/', $request_uri );

        $path = array_pop( $uris );

        while ( empty( $path ) ) :

            $path = array_pop( $uris );

        endwhile;

        return $path;

    }

    /*
        @param $url string      
        @param $route string || array      
        @param $routeLevel int ( tinh tu 0 )
        @param $maxLevel int ( tinh tu 0 )
    */
    function checkAdminRouteValidate( $url, $route, $routeLevel, $maxLevel ) {

        $request_uri = removeUrlAllParameters( $url );

        //echo $request_uri; die();

        $splices = explode( '/', $request_uri );

        $length = count( $splices );

        if ( empty( $splices[0] ) ) :

            array_splice( $splices, 0, 1 );
            $length--;

        endif;

        if ( empty( $splices[$length - 1] ) ) :

            array_pop( $splices ); // loai bo phan tu rong
            $length--;       

        endif;

        $max = $length - 1;

        //echo var_dump( $splices ); die();

        if ( $maxLevel !== $max ) return false;
        
        if ( $routeLevel > $max ) return false;

        if ( is_array( $route ) ) :            

            if ( count( $route ) === 0 ) return true;

            foreach ($route as $k => $v) :

                if ( $splices[$routeLevel] === $v ) return true;
                
            endforeach;

            return false;

        else :

            if ( $splices[$routeLevel] !== $route ) return false;

        endif;        

        return true;

    }

