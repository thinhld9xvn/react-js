<?php 
	class libImageUtils {

		public function __construct() {

		}

		public function get_image_thumbnail_array_sizes() {

			global $lt_hooks;			

			return array(

				'thumbnail' => array(150, 150),
				'medium' => array(300, 300),
				'large' => array(1024, 768)
	
			);
			
		}

		public function get_image_thumbnail_size() {

			$sizes = $this->get_image_thumbnail_array_sizes();

			return $sizes['thumbnail'];
			
		}

		public function get_attachment_array_sizes() {

			return array();

		}

		// @param string $imagePath = "uploads/test.png"
		// @return "uploads/test-{$thumb_width}x{$thumb_height}.png"
		public function get_image_thumbnail_path( $imagePath, $thumb_width, $thumb_height ) {

			$s = explode('/', $imagePath);

			array_pop( $s );

			$dir_path = implode('/', $s);

			return $dir_path . '/' . pathinfo( $imagePath, PATHINFO_FILENAME ) . "-{$thumb_width}x{$thumb_height}." . pathinfo( $imagePath, PATHINFO_EXTENSION );
			
		}

		public function get_image_thumbnail_base64( $imagePath, $thumb_width = 0, $thumb_height = 0 ) {	

			$thumbnail_fpath = '';

			if ( $thumb_width > 0 && $thumb_height > 0 ) :		

				$thumbnail_fpath = $this->get_image_thumbnail_path( $imagePath, $thumb_width, $thumb_height );

			endif;

			if ( $thumbnail_fpath === '' || ! file_exists( $thumbnail_fpath ) ) :

				$thumbnail_fpath = $imagePath;

			endif;

			$finfo = new finfo(FILEINFO_MIME_TYPE);
	    	$type = $finfo->file($thumbnail_fpath);

	    	return 'data:'.$type.';base64,'.base64_encode( file_get_contents($thumbnail_fpath) );

		}	

		public function resize_image_multiple_sizes( $imagePath, $thumbnail_sizes ) {			

			$ext = strtolower( pathinfo( $imagePath, PATHINFO_EXTENSION ) );

			$ext_images_allowed = array('jpg', 'jpeg', 'png');			

			if ( in_array( $ext, $ext_images_allowed ) ) :

				list( $width, $height ) = getimagesize( $imagePath );				

				$src = imagecreatefromstring( file_get_contents( $imagePath ) );

				foreach( $thumbnail_sizes as $thumbnail_size ) :

					$thumb_width = $thumbnail_size[0];
					$thumb_height = $thumbnail_size[1];

					if ( ( $width > $thumb_width ) || ( $height > $thumb_height ) ) :						

					    if ( $width > $thumb_width ) :

					   	  $new_width = $thumb_width;
					   	  $new_height = round( $new_width * $height / $width );

					    else :

					   	  $new_height = $thumb_height;
					   	  $new_width = round( $new_height * $width / $height );

					    endif;

						$imageThumbSavePath = $this->get_image_thumbnail_path( $imagePath, $new_width, $new_height );
						
						//if ( file_exist($imageThumbSavePath) ) return true;

					    $dst = imagecreatetruecolor( $new_width, $new_height );

						switch ( $ext ) :

				    		case 'jpg':
				    		case 'jpeg':

				    			// Resize and crop
								imagecopyresampled( $dst,
								                    $src,
								                    0, 
								                    0,
								                    0, 
								                    0,
								                    $new_width, $new_height,
								                    $width, $height );

				    			imagejpeg( $dst, $imageThumbSavePath, 75 );
				    			
				    			break;

				    		case 'png':	

				    			imagealphablending($dst, false);
				    			imagesavealpha($dst, true);

				    			// Resize and crop
								imagecopyresampled( $dst,
								                    $src,
								                    0, // Center the image horizontally
								                    0, // Center the image vertically
								                    0, 0,
								                    $new_width, $new_height,
								                    $width, $height );				    			

					           	imagepng( $dst, $imageThumbSavePath, 9 );

				    			break;

				    	endswitch; 

					endif;

			    endforeach;

			    return true; 

		    endif;

		    return false;

		}	

		public function crop_image_multiple_sizes( $imagePath, $thumbnail_sizes ) {			

			$ext = strtolower( pathinfo( $imagePath, PATHINFO_EXTENSION ) );

			$ext_images_allowed = array('jpg', 'jpeg', 'png');			

			if ( in_array( $ext, $ext_images_allowed ) ) :

				list( $width, $height ) = getimagesize( $imagePath );

				$original_aspect = $width / $height;

				$src = imagecreatefromstring( file_get_contents( $imagePath ) );

				foreach( $thumbnail_sizes as $thumbnail_size ) :

					$thumb_width = $thumbnail_size[0];
					$thumb_height = $thumbnail_size[1];

					if ( $width > $thumb_width || $height > $thumb_height ) :

						$imageThumbSavePath = $this->get_image_thumbnail_path( $imagePath, $thumb_width, $thumb_height );

						if ( $thumb_width > $width ) :

							$thumb_width = $width;

						endif;

						if ( $thumb_height > $height ) :

							$thumb_height = $height;

						endif;	   

						$thumb_aspect = $thumb_width / $thumb_height;

						if ( $original_aspect >= $thumb_aspect ) :

						   // If image is wider than thumbnail (in aspect ratio sense)
						   $new_height = $thumb_height;
						   $new_width = $width / ( $height / $thumb_height );
						
						else :
						
						   // If the thumbnail is wider than the image
						   $new_width = $thumb_width;
						   $new_height = $height / ( $width / $thumb_width );
						
						endif;			

						$dst = imagecreatetruecolor( $thumb_width, $thumb_height );

						switch ( $ext ) :

				    		case 'jpg':
				    		case 'jpeg':

				    			// Resize and crop
								imagecopyresampled( $dst,
						                    $src,
						                    0 - ( $new_width - $thumb_width ) / 2, // Center the image horizontally
						                    0 - ( $new_height - $thumb_height ) / 2, // Center the image vertically
						                    0, 0,
						                    $new_width, $new_height,
						                    $width, $height );

				    			imagejpeg( $dst, $imageThumbSavePath, 75 );
				    			
				    			break;

				    		case 'png':	

				    			imagealphablending($dst, false);
				    			imagesavealpha($dst, true);

				    			// Resize and crop
								imagecopyresampled( $dst,
						                    $src,
						                    0 - ( $new_width - $thumb_width ) / 2, // Center the image horizontally
						                    0 - ( $new_height - $thumb_height ) / 2, // Center the image vertically
						                    0, 0,
						                    $new_width, $new_height,
						                    $width, $height );				    			

					           	imagepng( $dst, $imageThumbSavePath, 9 );

				    			break;

				    	endswitch; 

				    endif;

			    endforeach;

			    return true; 

		    endif;

		    return false;

		}

		/*public function getFileThumbnailSrc( $file_path ) {

	        $ext = strtolower( pathinfo( $file_path, PATHINFO_EXTENSION) );

	    	switch ( $ext ) :

				case 'doc':
				case 'docx':

					$thumbnail_src = LT_FILEMANAGER_WORD_ICON;
					
					break;

				case 'xls':
				case 'xlsx':

					$thumbnail_src = LT_FILEMANAGER_EXCEL_ICON;

					break;

				case 'pdf':

					$thumbnail_src = LT_FILEMANAGER_PDF_ICON;

					break;

				case 'exe':

					$thumbnail_src = LT_FILEMANAGER_EXE_ICON;

					break;

				case 'php':

					$thumbnail_src = LT_FILEMANAGER_PHP_ICON;

					break;
				
				default:

					$thumbnail_src = LT_FILEMANAGER_OTHER_ICON;
					
					break;

			endswitch;

			return $thumbnail_src;

	    }*/	    

		// lấy thông tin các thumbnail sizes tồn tại
		// tương đương với các file thumbnail trên hệ thống
		public function get_exist_thumbnail_sizes( $fileinfo, $thumbnail_sizes ) {

			require_once LIBRARIES_DIR_PATH . 'libMediaFileSystemUtils.php';

			$mediaFileSysUtils = new libMediaFileSystemUtils();			
			
			$_thumbnail_sizes = $thumbnail_sizes;

			$fn = "{$fileinfo['filename']}.{$fileinfo['extension']}";
			$fn_path = $mediaFileSysUtils->concatDFPath( $fileinfo['dirname'], $fn );

			list( $width, $height ) = getimagesize( $fn_path );

			$arr_keys = array_keys( $thumbnail_sizes );
			$length = count( $arr_keys );

			for ( $i = 0; $i < $length; $i++ ) :	

				$key = $arr_keys[ $i ];

				$thumb_width = $thumbnail_sizes[ $key ][0];
				$thumb_height = $thumbnail_sizes[ $key ][1];

				if ( ( $width > $thumb_width ) || ( $height > $thumb_height ) ) :

				    if ( $width > $thumb_width ) :

				   	  $new_width = $thumb_width;
				   	  $new_height = round( $new_width * $height / $width );

				    else :

				   	  $new_height = $thumb_height;
				   	  $new_width = round( $new_height * $width / $height );

					endif;

					$_fn_thumbnail = "{$fileinfo['filename']}-{$new_width}x{$new_height}.{$fileinfo['extension']}";					
					$_fn_thumbnail_path = $mediaFileSysUtils->concatDFPath( $fileinfo['dirname'], $_fn_thumbnail );

					if ( ! file_exists( $_fn_thumbnail_path ) ) :

						unset( $_thumbnail_sizes[ $key ] );

					else :

						$_thumbnail_sizes[ $key ] = array( $new_width, $new_height );

					endif;

				else :					

					unset( $_thumbnail_sizes[ $key ] );

				endif;
				
			endfor;			

			return $_thumbnail_sizes;		

		}

	}