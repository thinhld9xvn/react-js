<?php
    class Configuration {

        public function getActivePostTypesList() {

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

        public function getDeActivePostTypesList() {

            try {

                $params = array(
 
                    'fields' => array('id', 'name', 'description', 'slug'),
                    'table' => ENTRIES_POST_TYPES_TABLE,
                    'where' => array(
 
                        'status' => array(
 
                             'value' => 'trash',
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

        public function createNewPostType() {

            $formFields = json_decode( $_POST['formFields'], true );

            extract( $formFields );

            return libPostTypesUtils::createNewPostType($formFields);
            
            
        }

        public function updatePostType() {

            $formFields = json_decode( $_POST['formFields'], true );

            extract( $formFields );

            return libPostTypesUtils::updatePostType($formFields);
            

        }

        public function removePostType() {

            $pids = json_decode( $_POST['pids'], true );

            return libPostTypesUtils::removePostType( $pids );

        }

        public function restorePostType() {

            $pids = json_decode( $_POST['pids'], true );

            return libPostTypesUtils::restorePostType( $pids );

        }

        public function removePermantlyPostType() {

            $pids = json_decode( $_POST['pids'], true );
            $slugs = json_decode( $_POST['slugs'], true );

            return libPostTypesUtils::removePermantlyPostType( array('pids' => $pids, 
                                                                     'slugs' => $slugs) );

        }

    }