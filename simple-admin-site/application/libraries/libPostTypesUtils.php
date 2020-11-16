<?php
    class libPostTypesUtils {

        public static function getActivePostTypesList() {

            try {

                $params = array(
 
                    'fields' => array('id', 'name', 'description', 'slug'),
                    'table' => ENTRIES_POST_TYPES_TABLE,
                    'where' => array(
 
                        'status' => array(
 
                             'value' => 'public',
                             'type' => 'string'
 
                        )
 
                    )
 
                );
 
                $results = libQueries::select( $params );
 
            } catch (Exception $e) {
 
                return $e->getMessage();
 
            }
 
            return $results;

        }

        public static function checkPostTypeExist($name, $slug) {

            try {

                $params = array(
 
                    'fields' => array('id'),
                    'table' => ENTRIES_POST_TYPES_TABLE,
                    'where' => array(

                        'OR' => array(
    
                            'slug' => array(
    
                                'value' => $slug,
                                'type' => 'string'
    
                            ),

                            'name' => array(
    
                                'value' => $name,
                                'type' => 'string'
    
                            )

                        )
 
                    )
 
                );
 
                $results = libQueries::select( $params );
 
            } catch (Exception $e) {
 
                return false;
 
            }
 
            return count( $results ) > 0;

        }

        public static function createNewPostType($data) {

            extract( $data );

            try {

                $isPostTypeExist = self::checkPostTypeExist($namePostType, $slugPostType);

                if ( $isPostTypeExist ) return 'Mục post type đã tồn tại, mời nhập một tên khác !!!';

                $params = array(

                    'fields' => array(

                        'name' => $namePostType,
                        'slug' => $slugPostType,
                        'description' => $descriptionPostType,
                        'status' => 'public'

                    ),

                    'table' => ENTRIES_POST_TYPES_TABLE

                );

                $result = libQueries::insert($params);                

                $result = self::createPostTypeTable($slugPostType);

            } catch ( Exception $e ) {

                return $e->getMessage();

            }

            return $result;

        }

        public static function createPostTypeTable($slug) {

            try {  

                $slug = preg_replace("/\-/", "", $slug);

                $aptype_posts_table = DB_PREFIX . "{$slug}_post_type";
                $aptype_categories_table = DB_PREFIX . "{$slug}_categories";

                $sql = "SHOW TABLES LIKE '{$aptype_posts_table}'";

                $result1 = libQueries::query($sql);

                $sql = "SHOW TABLES LIKE '{$aptype_categories_table}'";

                $result2 = libQueries::query($sql);                

                if ( count( $result2 ) === 0 ) :

                    $sql = array(
                            "CREATE TABLE {$aptype_categories_table} (" .
                            "  id int(11) NOT NULL AUTO_INCREMENT," .
                            "  name varchar(200) NOT NULL," .
                            "  description text NOT NULL," .
                            "  url varchar(200) NOT NULL," .
                            "  parent int(11) NOT NULL," .
                            "  metadata json NOT NULL," .
                            "  primary key ( id )" .
                            ")",
                            "CREATE INDEX idx_name ON {$aptype_categories_table} (name)",
                            "CREATE INDEX idx_url ON {$aptype_categories_table} (url)",
                            "CREATE INDEX idx_parent ON {$aptype_categories_table} (parent)"
                    );              
                    
                    libQueries::queryBatch($sql);      
                
                endif;        

                if ( count( $result1 ) === 0 ) :

                    $sql = array(
                                "CREATE TABLE {$aptype_posts_table} (" .
                                "  id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT," .
                                "  post_title varchar(200) NOT NULL," .
                                "  post_content text NOT NULL," .
                                "  post_excerpt text NOT NULL," .
                                "  post_url varchar(200) NOT NULL," .
                                "  post_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," .
                                "  post_author int(11) NOT NULL," .
                                "  post_modified_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP," .
                                "  post_metadata TEXT NOT NULL," .
                                "  post_status varchar(7) NOT NULL DEFAULT 'public'," .
                                "  FOREIGN KEY (post_author) REFERENCES " . USERS_TABLE . " (id)" .
                                ")",
                                "CREATE INDEX idx_post_title ON {$aptype_posts_table} (post_title)",
                                "CREATE INDEX idx_post_url ON {$aptype_posts_table} (post_url)",
                                "CREATE INDEX idx_post_date ON {$aptype_posts_table} (post_date)",
                                "CREATE INDEX idx_post_author ON {$aptype_posts_table} (post_author)",
                                "CREATE INDEX idx_post_status ON {$aptype_posts_table} (post_status)"
                    );            

                    libQueries::queryBatch($sql);

                endif;

            } catch( Exception $e) {

                return false;

            }

            return true;

        }

        public static function renamePostTypeTable($slug, $new_slug) {

            try {

                $slug = preg_replace("/\-/", "", $slug);
                $new_slug = preg_replace("/\-/", "", $new_slug);

                $aptype_posts_table = DB_PREFIX . "{$slug}_post_type";
                $aptype_categories_table = DB_PREFIX . "{$slug}_categories";

                $_aptype_posts_table = DB_PREFIX . "{$new_slug}_post_type";
                $_aptype_categories_table = DB_PREFIX . "{$new_slug}_categories";

                $sql = "SHOW TABLES LIKE '{$aptype_posts_table}'";

                $result1 = libQueries::query($sql);

                $sql = "SHOW TABLES LIKE '{$aptype_categories_table}'";

                $result2 = libQueries::query($sql);             

                if ( count( $result2) > 0 ) :

                    $sql = "RENAME TABLE {$aptype_categories_table} TO {$_aptype_categories_table}";

                    libQueries::query($sql);

                endif;

                if ( count( $result1) > 0 ) :

                    $sql = "RENAME TABLE {$aptype_posts_table} TO {$_aptype_posts_table}";

                    libQueries::query($sql);

                endif;
            
            } catch (Exception $e) {

                return false;
            
            }
            
            return true;

        }

        public static function removePostTypeTable($slugs) {

            try {

                foreach ($slugs as $k => $slug) :

                    $slug = preg_replace("/\-/", "", $slug);
                
                    $aptype_posts_table = DB_PREFIX . "{$slug}_post_type";
                    $aptype_categories_table = DB_PREFIX . "{$slug}_categories";            

                    $sql = "SHOW TABLES LIKE '{$aptype_posts_table}'";

                    $result1 = libQueries::query($sql);

                    $sql = "SHOW TABLES LIKE '{$aptype_categories_table}'";

                    $result2 = libQueries::query($sql);                       

                    if ( count( $result2 ) > 0 ) :                        

                        $sql = "DROP TABLE {$aptype_categories_table}";

                        libQueries::query($sql);

                    endif;

                    if ( count( $result1 ) > 0 ) :

                        $sql = "DROP TABLE {$aptype_posts_table}";

                        libQueries::query($sql);

                    endif;

                endforeach;
            
            } catch (Exception $e) {

                return false;
            
            }
            
            return true;

        }

        public static function updatePostType($data) {

            //print_r( $data ); die();

            extract($data);

            try {

                $isPostTypeExist = self::checkPostTypeExist($namePostType, $slugPostType);

                if ( $isPostTypeExist ) return 'Mục post type đã tồn tại, mời nhập một tên khác !!!';
            
                $params = array(
            
                    'fields' => array(

                        'name' => array(
                            'value' => $namePostType,
                            'type' => 'string'
                        ),
                        'slug' => array(
                            'value' => $slugPostType,
                            'type' => 'string'
                        ),
                        'description' => array(
                            'value' => $descriptionPostType,
                            'type' => 'string'
                        )
                    ),
                    'table' => ENTRIES_POST_TYPES_TABLE,
                    'where' => array(

                        'AND' => array(

                            'name' => array(
                                'value' => $_namePostType,
                                'type' => 'string'
                            ),

                            'status' => array(
                                'value' => 'public',
                                'type' => 'string'
                            )

                        )

                    )
            
                );
            
                $result = libQueries::update($params);

                $result = self::renamePostTypeTable($_slugPostType, $slugPostType);
            
            } catch (Exception $e) {

                return $e->getMessage();
            
            }

            return true;

        }

        public static function removePostType($data) {

            $pids = '(';

            foreach ($data as $k => &$v) :

                $pids .= $v;

                if ( end($data) !== $v ) :

                    $pids .= ',';

                endif;
                
            endforeach;

            $pids .= ')';

            try {                
            
                $params = array(
            
                    'fields' => array(

                        'status' => array(
                            'value' => 'trash',
                            'type' => 'string'
                        )

                    ),
                    'table' => ENTRIES_POST_TYPES_TABLE,
                    'where' => "status = 'public' AND id IN {$pids}"
            
                );
            
                $result = libQueries::update($params);
            
            } catch (Exception $e) {

                return $e->getMessage();
            
            }

            return true;

        }

        public static function restorePostType($data) {

            $pids = '(';

            foreach ($data as $k => &$v) :

                $pids .= $v;

                if ( end($data) !== $v ) :

                    $pids .= ',';

                endif;
                
            endforeach;

            $pids .= ')';

            try {                
            
                $params = array(
            
                    'fields' => array(

                        'status' => array(
                            'value' => 'public',
                            'type' => 'string'
                        )

                    ),
                    'table' => ENTRIES_POST_TYPES_TABLE,
                    'where' => "status = 'trash' AND id IN {$pids}"
            
                );
            
                $result = libQueries::update($params);
            
            } catch (Exception $e) {

                return $e->getMessage();
            
            }

            return true;

        }

        public static function removePermantlyPostType($data) {

            $pids = '(';

            foreach ($data['pids'] as $k => &$v) :

                $pids .= $v;

                if ( end($data['pids']) !== $v ) :

                    $pids .= ',';

                endif;
                
            endforeach;

            $pids .= ')';

            try {                
            
                $params = array(

                    'table' => ENTRIES_POST_TYPES_TABLE,
                    'where' => "status = 'trash' AND id IN {$pids}"
            
                );
            
                $result = libQueries::delete($params);

                $result = self::removePostTypeTable($data['slugs']);
            
            } catch (Exception $e) {

                return $e->getMessage();
            
            }

            return true;


        }

    }