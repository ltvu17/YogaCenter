import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';

import { useParams } from 'react-router-dom';
import Bloges from "../data/ListOfBlog";
import { Grid, Typography } from "@mui/material";
import '../css/blogdetail.css'
export default function BlogDetail(){
    const { slug } = useParams();
    const [bloges,setBloges] = useState([]);
    useEffect(()=>{
        async function getBloges() {
            setBloges(await Bloges());
        }
        getBloges();
    },[])
    function filterDay(day){
        const split = day.split("T");
        let value = split[0];
        return value;
    }
    const blogPost = bloges.find(blog => blog.node.slug === slug);


    if (!blogPost) {
      return <div>Bài viết không tồn tại</div>;
    }
    return (
      <Grid container className="blogDetail-container">
       <Grid item md={12} className="blogDetail-header">
            <div className="img-container">
            <img src={blogPost.node.image.url} alt="Blog Image" />
            </div>
        </Grid>
        <Grid container item md={12} className="blogDetail-content">
            <Grid item md={8}>
                <Typography variant="h1" sx={{fontSize:'2rem',fontWeight:'700'}}>{blogPost.node.title}</Typography>
                <Typography variant="subtitle1" 
                    sx={{fontSize: '0.9rem',
                    color: '#00000087',
                    fontWeight: '900'}}>
                                        {filterDay(blogPost.node.createdAt)}
                 </Typography>
                <p>{blogPost.node.description}</p>
                {/* Đây là nơi show cái blog đang xem, thử test show ra 1 cái xem như răng để t coi thiết kế lại như răng */}
            </Grid>
                <Grid container item md={4}>
                    {/* Đây là list các blog cùng type với cái blog đang xem xếp theo ngày tháng từ mới nhất đến cũ nhất ( tầm 5-6 bài) */}
                <Typography variant="h4" sx={{fontWeight:'600',color:'#434343'}}>Other Blogs</Typography>
                <hr style={{ borderTop: '1px solid #434343', margin: '10px 0' }} />
                {bloges.map(blog => (
                    <Grid key={blog.node.slug} item md={12} sx={{ padding: '20px' }}>
                    <Card sx={{ display: 'flex' }}>
                        <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image= {blog.node.image.url}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography  variant="h5"
                                        sx={{fontSize:'0.9rem',
                                            fontWeight:'600',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color:'#434343'
                                        }}>
                                        {blog.node.title}
                                    </Typography>
                                    <Typography variant="subtitle1" 
                                        sx={{fontSize: '0.9rem',
                                            color: '#00000087',
                                            fontWeight: '900'}}>
                                        {filterDay(blog.node.createdAt)}
                                    </Typography>
                                </CardContent>
                            
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
      </Grid>
    );

}