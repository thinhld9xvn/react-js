<?php
    class libFileUtils {

        public function getFileType( $ext ) {

	        $type = '';
			$typecode = 'other';
			
	        switch ( strtolower( $ext ) ) :

	            case 'jpg':
	            case 'jpeg':
	            case 'png':
	            case 'bmp':
	            case 'svg':
	            case 'gif':

	                $type = 'Hình ảnh';
	                $typecode = 'image';

	                break;

	            case 'doc':
				case 'docx':

					$type = 'Văn bản word';
					$typecode = 'word';
					
					break;

	            case 'xls':
				case 'xlsx':

					$type = 'Bảng tính excel';
					$typecode = 'excel';
					
					break;

	            case 'pdf':

	                $type = 'Tài liệu pdf';
	                $typecode = 'portable document';

	                break;

	            case 'exe':

	                $type = 'Tập tin thực thi';                    
	                $typecode = 'execuable';

	                break;

	            case 'php':

	                $type = 'Mã nguồn php';                    
	                $typecode = 'php source';

	                break;
	            
	            default:

	                $type = 'Loại khác';
	                
	                break;

			endswitch;

	        return array('type' => $type, 'code' => $typecode );

	    }

    }