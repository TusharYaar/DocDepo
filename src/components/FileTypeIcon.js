import React from 'react'
import PictureAsPdfRoundedIcon from '@material-ui/icons/PictureAsPdfRounded';
import InsertDriveFileRoundedIcon from '@material-ui/icons/InsertDriveFileRounded';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import MovieRoundedIcon from '@material-ui/icons/MovieRounded';

const FileTypeIcon = ({fileType}) => {
   if (fileType ==="application/pdf")
    return <PictureAsPdfRoundedIcon color="secondary"/>
    else if (fileType.includes("image")) return <ImageRoundedIcon color="secondary"/>
    else if (fileType.includes("video")) return <MovieRoundedIcon color="secondary"/>
    else return <InsertDriveFileRoundedIcon color="secondary" />
}

export default FileTypeIcon
