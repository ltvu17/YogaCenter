import React, { useState } from "react";
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import '../css/blog.css'
import { bloges } from "../data/ListOfBlog";
export default function Blog(){
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const pageCount = Math.ceil(bloges.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = bloges.slice(indexOfFirstItem, indexOfLastItem);
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
      };
    return(
        <Grid container className="blog-container">
            <Grid item md={12} className="blog-header">
                <img src='/assets/images/background-blog.jpg' />
                <div className="blog-title">
                    <h1 className="title-small">NEWS</h1>
                    <h1 className="title-big">NEWS</h1>
                </div>
            </Grid>
            <Grid container item md={12} sx={{marginTop:'50px',paddingLeft:'10%',paddingRight:'10%'}} className="blog-content">
            {currentItems.map(blog => (
                    <Grid key={blog.id} item md={4} sx={{ padding: '20px' }}>
                        <Card className="card-blog">
                            <Link to='/'>
                            <div className="image-container">
                                <CardMedia
                                component="img"
                                sx={{
                                    height:'250px',
                                    transition: 'transform 0.3s',
                                }}
                                image={blog.img}
                                className="zoom-image"
                                />
                            </div>
                            </Link>
                            <CardContent>
                            <Typography variant="h3"
                                sx={{fontSize: '20px',
                                fontWeight: '600',
                                color: '#0000007a',
                                margin:'10px 0'
                                }}>
                                {blog.type}
                            </Typography>
                            <Link to='/'>
                            <Typography variant="h5" 
                                sx={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    color: '#c60303',
                                    fontWeight: '600',
                                    fontSize:'22px',
                                    margin: '0'
                                }}>
                                {blog.name}
                            </Typography>
                            </Link>
                            <Typography 
                            sx={{
                                color: '#00000063',
                                letterSpacing: '2px',
                                fontWeight: '600',
                                marginBottom:'10px',
                                marginTop:'10px',
                            }}>
                                {blog.time}
                            </Typography>
                            <Typography variant="h6" 
                                sx={{
                                fontSize:'16px',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                color: 'black',
                                fontWeight:'500'
                                }}>
                                {blog.describe}
                            </Typography>
                            </CardContent>
                    
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handleChangePage}
                  
                />
            </Grid>
        </Grid>
        
    )
}