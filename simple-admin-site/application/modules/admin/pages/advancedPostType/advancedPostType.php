<?php
    class AdvancedPostType {

        public static function getPostsList() {

            try {

                $slugPostType = preg_replace("/\-/", "", $_POST['slugPostType']);              

                $post_type_table = DB_PREFIX . "{$slugPostType}_post_type";
            
                $params = array(
            
                    'fields' => array(sprintf('%s.id', $post_type_table ), 'post_title', 'post_content', 'post_excerpt', 
                                      'post_url', 'post_date', sprintf('%s.post_author, %s.username',$post_type_table, USERS_TABLE), 'post_modified_date', 'post_metadata', 'post_status'),
                    'inner_join' => array(

                        'table' => USERS_TABLE,
                        'condition' => sprintf('%s.post_author = %s.id', $post_type_table, USERS_TABLE)

                    ),
                    'table' => $post_type_table,
                    'where' => array(

                        'post_status' => array(

                            'value' => 'public',
                            'type' => 'string'

                        )

                    )
            
                );
            
                $result = libQueries::select($params);
            
            } catch (Exception $e) {

                return $e->getMessage();
            
            }

            return $result;

        }

    }