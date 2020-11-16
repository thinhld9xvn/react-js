<?php

    //require_once  dirname(__FILE__) . '/interface/IQueries.php';

    class libQueries {

        /* 
            libQueries::select(
                array(
                    'fields' => array('id', 'name', ...),
                    'table' => '...',
                    'inner_join' => array(

                        'table' => '...',
                        'condition' => '...'

                    ),
                    'where' => 
                        [array(

                            'AND' => array(
                                'name' => array(
                                    'value' => '...',
                                    'type' => ['string', 'int', 'boolean', 'null']
                                ),
                                ....
                            ),

                            'OR' => array(
                                'name' => array(
                                    'value' => '...',
                                    'type' => ['string', 'int', 'boolean', 'null']
                                ),
                                ...
                            )

                        )]
                        ||
                        ['condition expression']

                )
            )
        */              

        private static function _get_bind( $key, $value, $type ) {         

            if ( $type === 'string' ) :

                $value = self::get_str($value);

                return "{$key} = '{$value}'";

            elseif ( $type === 'int' ) :

                $value = self::get_int( $value );

                return "{$key} = {$value}";

            elseif ( $type === 'boolean' ) :

                $value = self::get_bool( $value );

                return "{$key} = $value";

            elseif ( $type === 'null' ) :

                return "{$key} = null";

            endif;

            return '';

        }

        private static function bind_where_parameters( $st, $where ) {

            $CI =& get_instance();

            $keys = array_keys( $where );            

            $alias = $keys[0];
            $conditions = $where[$alias];

            $keys = array_keys( $conditions );
            $length = count( $keys );

            if ( in_array( strtolower( $alias ), array('or', 'and') ) ) :              

                for ( $i = 0; $i < $length; $i++ ) :

                    $key = $keys[$i];
                    $field = $conditions[ $key ];

                    $st .= self::_get_bind($key, $field['value'], $field['type']);

                    if ( $i < $length - 1 ) :  

                        $st .= " {$alias} ";

                    endif;

                endfor;

            else :

                $key = $alias;
                $value = $conditions['value'];
                $type = $conditions['type'];

                $st .= self::_get_bind( $key, $value, $type );

            endif;

            return $st;

        }

        private static function bind_update_parameters( $st, $params ) {

            $CI =& get_instance();

            $keys = array_keys( $params );           
            $length = count( $keys );

			for ( $i = 0; $i < $length; $i++ ) :

                $key = $keys[$i];
                $field = $params[ $key ];

                $value = $field['value'];
                $type = $field['type'];

                if ( $type === 'string' ) :

                    $value = self::get_str($value);

                    $st .= "{$key} = '{$value}'";

                elseif ( $type === 'int' ) :

                    $value = self::get_int( $value );

                    $st .= "{$key} = {$value}";

                elseif ( $type === 'boolean' ) :

                    $value = self::get_bool( $value );

                    $st .= "{$key} = $value";

                elseif ( $type === 'null' ) :

                    $st .= "{$key} = null";

                endif;

                if ( $i < $length - 1 ) :

                    $st .= ",";

                endif;                       

            endfor;

            return $st;

        }

        private static function insert_parameters( $st, $fields ) {			

			$field_names = array_keys( $fields );
			$keys_length = count( $field_names );

			for ( $i = 0; $i < $keys_length; $i++ ) :

                $value = $fields[ $field_names[ $i ] ];
                
                $st .= $value;

                if ( $i < $keys_length - 1 ) :

                    $st .= ",";

                endif;              						

			endfor;

			return $st;

        }	

        public static function get_instance_db() {

            $CI =& get_instance();                

            return $CI->db;

        }
        
        public static function get_str( $s ) {

            $db = self::get_instance_db();

            return $db->escape_str( $s );
            
        }

        public static function get_int( $v ) {

            return intval( $v );

        }

        public static function get_bool( $v ) {

            return boolval( $v );

        }

        public static function select($params) {

            $db = self::get_instance_db();

            $fields = $params['fields'];
            $table = $params['table'];
            $inner_join = array_key_exists('inner_join', $params) ? $params['inner_join'] : '';
            $where = array_key_exists('where', $params) ? $params['where'] : '';

            $st = "SELECT ";

            $st = self::insert_parameters($st, $fields);

            $st .= " FROM {$table} ";

            if ( ! empty( $inner_join ) ) :

                $ij_table = $inner_join['table'];
                $ij_condition = $inner_join['condition'];

                $st .= " INNER JOIN {$ij_table} ON {$ij_condition} ";                

            endif;

            if ( ! empty( $where ) ) :

                $st .= " WHERE ";

                if ( is_array( $where ) ) :

                    $st = self::bind_where_parameters($st, $where);

                else :

                    $st .= $where;

                endif;

            endif;            

            $db->trans_begin();

            $query = $db->query($st);

            //throw new Exception('Lỗi khi lấy dữ liệu từ database, xin thử lại sau !!!');

            if ( $db->trans_status() === false ) :

                $db->trans_rollback();

                throw new Exception('Lỗi khi lấy dữ liệu từ database, xin thử lại sau !!!');

            endif;

            $db->trans_commit();

            return $query->result();
           

        }

        public static function insert($params) {

            $db = self::get_instance_db();

            $fields = $params['fields'];
            $table = $params['table'];                      

            $db->trans_begin();

            $db->insert($table, $fields);
            $inserted_id = $db->insert_id();

            //throw new Exception('Lỗi khi lấy dữ liệu từ database, xin thử lại sau !!!');

            if ( $db->trans_status() === false ) :

                $db->trans_rollback();

                throw new Exception('Lỗi khi chèn dữ liệu vào database, xin thử lại sau !!!');

            endif;

            $db->trans_commit();

            return $inserted_id;

        }   

        public static function update($params) {

            $db = self::get_instance_db();

            $fields = $params['fields'];
            $table = $params['table'];
            $where = $params['where'];

            $st = "UPDATE {$table} SET ";
            
            $st = self::bind_update_parameters($st, $fields);            

            if ( ! empty( $where ) ) :

                $st .= " WHERE ";

                if ( is_array( $where ) ) :

                    $st = self::bind_where_parameters( $st, $where );

                else :

                    $st .= $where;

                endif;

            endif;

            $db->trans_begin();

            $query = $db->query($st);  

            //throw new Exception('Lỗi khi cập nhật dữ liệu, xin thử lại sau !!!');          

            //throw new Exception('Lỗi khi lấy dữ liệu từ database, xin thử lại sau !!!');

            if ( $db->trans_status() === false ) :

                $db->trans_rollback();

                throw new Exception('Lỗi khi cập nhật dữ liệu, xin thử lại sau !!!');

            endif;

            $db->trans_commit();

            return true;

        } 

        public static function delete($params) {

            $db = self::get_instance_db();
            
            $table = $params['table'];
            $where = $params['where'];

            $st = "DELETE FROM {$table} ";

            if ( ! empty( $where ) ) :

                $st .= " WHERE ";

                if ( is_array( $where ) ) :

                    $st = self::bind_where_parameters( $st, $where );

                else :

                    $st .= $where;

                endif;

            endif;

            $db->trans_begin();

            $query = $db->query($st);            

            //throw new Exception('Lỗi khi lấy dữ liệu từ database, xin thử lại sau !!!');

            if ( $db->trans_status() === false ) :

                $db->trans_rollback();

                throw new Exception('Lỗi khi xóa dữ liệu, xin thử lại sau !!!');

            endif;

            $db->trans_commit();

            return true;

        }      

        public static function query($st) {

            $db = self::get_instance_db();           

            $db->trans_begin();   

            $query = $db->query($st);             

            $result = is_object( $query ) ? $query->result() : $query;

            if ( $db->trans_status() === false ) :

                $db->trans_rollback();

                throw new Exception('Lỗi khi thực thi mã SQL, xin thử lại sau !!!');

            endif;

            $db->trans_commit();            

            return $result;

        }  

        public static function queryBatch($st) {

            $db = self::get_instance_db();           

            $db->trans_begin();  

            foreach ($st as $k => $v) :

                $db->query($v);
                
            endforeach;

            if ( $db->trans_status() === false ) :

                $db->trans_rollback();

                throw new Exception('Lỗi khi thực thi mã SQL, xin thử lại sau !!!');

            endif;

            $db->trans_commit();            

            return true;

        }

    }