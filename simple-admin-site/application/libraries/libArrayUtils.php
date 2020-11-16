<?php 
    class libArrayUtils {

        private static $isFoundArray;        
        
        public static function pushArrayTree($key, $value, $childKey, &$array, $needed, $loop_count = 1) {

            // reset variable
            if ( $loop_count === 1 ) self::$isFoundArray = false;

            if ( self::$isFoundArray ) return;
             
            $keys = array_keys( $array );
            $length = count( $keys );           

            for ( $i = 0; $i < $length; $i++ ):

                $k = $keys[$i];
                $v =& $array[$k];      
                
                if ( $k === $key && $v === $value ) :

                    self::$isFoundArray = true;

                    array_push( $array[$childKey], $needed );

                    return;

                endif;
                
                if ( is_array( $v ) && count( $v ) > 0 && ! self::$isFoundArray ) :

                    $loop_count++;

                    self::pushArrayTree( $key, $value, $childKey, $v, $needed, $loop_count );

                endif;                
                
            endfor;                  

        }

    }