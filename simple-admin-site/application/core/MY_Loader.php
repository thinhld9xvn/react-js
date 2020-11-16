<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

/* load the MX_Loader class */
require APPPATH."third_party/MX/Loader.php";

class MY_Loader extends MX_Loader {

    public function template_view($view, $vars = array(), $get = FALSE) {

        $dir_templates = APPPATH . '/templates';

        //  ensures leading /
        if ($view[0] != '/') $view = '/' . $view;
        //  ensures extension   
        $view .= ((strpos($view, ".", strlen($view)-5) === FALSE) ? '.php' : '');
        //  replaces \'s with /'s
        $view = str_replace('\\', '/', $view);

        if (!is_file($view)) if (is_file($dir_templates.$view)) $view = ($dir_templates.$view);

        if (is_file($view)) {
            if (!empty($vars)) extract($vars);
            ob_start();
            include($view);
            $return = ob_get_clean();
            if (!$get) echo($return);
            return $return;
        }

        return show_404($view);

    }

}