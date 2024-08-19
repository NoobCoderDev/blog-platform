import { useState, useEffect } from 'react';
import { Box, FormControl, styled, InputBase, Button, TextareaAutosize } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Sports1 from '../Images/Sports1.jpg';

const initialPost = {
    title : '',
    description : '',
    picture : '',
    username : '',
    categories : '',
    createdAt : new Date()
}

export default function CreatePosts() {

    const [post,setPost] = useState(initialPost);
    const [File, setFile] = useState('');
    const url = Sports1;

    useEffect(() => {
        const getImage = () => {
            if(File){
                const data = new FormData();
                data.append("name", File.name);
                data.append("file",File);

                post.picture = '';
            }
        }
        getImage();
        // post.categories;
    },[File, post])

    const handleChange = (e) => {
        setPost({...post,[e.target.name] : e.target.value});
    }

  return (
    <>
        <OuterDiv>
            <Container>
                <Image src={url} alt='Your Blog pic'/>
                <StyledFormControl>
                    <label htmlFor='fileInput'>
                        <AddCircleIcon fontSize='large' color='action' />
                    </label>
                    <input id='fileInput' type='file' style={{display : 'none'}} onChange={(e)=>{setFile(e.target.files[0])}}/>
                    <InputTextField placeholder='Title' onChange={(e) => {handleChange(e)}} name='title'/>
                    <Button variant='contained'>publish</Button>
                </StyledFormControl>
                <TextArea minRows={5} placeholder='Tell about the blog...' onChange={(e) => {handleChange(e)}} name='description'/>
            </Container>
        </OuterDiv>
    </>
  )
}

const Image = styled('img')({
    width : '100%',
    height : '50vh',
    objectFit : 'cover'
})

const OuterDiv = styled(Box)`
    margin-top : 65px;
`;

const Container = styled(Box)`
    margin : 80px 100px;

`;

const StyledFormControl = styled(FormControl)`
    margin-top : 10px;
    display : flex;
    flex-direction : row;
`;

const InputTextField = styled(InputBase)`
    flex : 1;
    margin : 0px 30px;
    font-size : 25px;
`;

const TextArea = styled(TextareaAutosize)`
    width : 100%;
    margin-top : 40px;
    font-size : 18px;
`;