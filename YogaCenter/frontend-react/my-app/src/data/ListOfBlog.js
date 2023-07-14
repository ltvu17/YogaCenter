// export const bloges = [
//   {
//     id: 1,
//     type:'Practice',
//     name: "Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga",
//     describe: "Balancing body and mind through basic postures and breath control A dynamic form of yoga that combines smooth movements and breath control A dynamic form of yoga that combines smooth movements and breath control",
//     img: "/assets/images/class1.jpg",
//     time:'1/1/1111'
//   },
//   {
//     id: 2,
//     type:'News Yoga FPTU',
//     name: "Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga",
//     describe: "Balancing body and mind through basic postures and breath control A dynamic form of yoga that combines smooth movements and breath control A dynamic form of yoga that combines smooth movements and breath control",
//     img: "/assets/images/class1.jpg",
//     time:'1/1/1111'
//   },

//   {
//     id: 3,
//     type:'Practice',
//     name: "Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga",
//     describe: "Balancing body and mind through basic postures and breath control A dynamic form of yoga that combines smooth movements and breath control A dynamic form of yoga that combines smooth movements and breath control",
//     img: "/assets/images/class1.jpg",
//     time:'1/1/1111'
//   },
//   {
//     id: 4,
//     type:'News Yoga FPTU',
//     name: "Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga",
//     describe: "Balancing body and mind through basic postures and breath control A dynamic form of yoga that combines smooth movements and breath control A dynamic form of yoga that combines smooth movements and breath control",
//     img: "/assets/images/class1.jpg",
//     time:'1/1/1111'
//   },
//   {
//     id: 5,
//     type:'Nutritional diet',
//     name: "Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga",
//     describe: "Balancing body and mind through basic postures and breath control A dynamic form of yoga that combines smooth movements and breath control A dynamic form of yoga that combines smooth movements and breath control",
//     img: "/assets/images/class1.jpg",
//     time:'1/1/1111'
//   },
//   {
//     id: 6,
//     type:'Practice',
//     name: "Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga",
//     describe: "Balancing body and mind through basic postures and breath control A dynamic form of yoga that combines smooth movements and breath control A dynamic form of yoga that combines smooth movements and breath control",
//     img: "/assets/images/class1.jpg",
//     time:'1/1/1111'
//   },
//   {
//     id: 7,
//     type:'Practice',
//     name: "Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga",
//     describe: "Balancing body and mind through basic postures and breath control A dynamic form of yoga that combines smooth movements and breath control A dynamic form of yoga that combines smooth movements and breath control",
//     img: "/assets/images/class1.jpg",
//     time:'1/1/1111'
//   },
//   {
//     id: 8,
//     type:'News Yoga FPTU',
//     name: "Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga",
//     describe: "Balancing body and mind through basic postures and breath control A dynamic form of yoga that combines smooth movements and breath control A dynamic form of yoga that combines smooth movements and breath control",
//     img: "/assets/images/class1.jpg",
//     time:'1/1/1111'
//   },

//   {
//     id: 9,
//     type:'Practice',
//     name: "Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga",
//     describe: "Balancing body and mind through basic postures and breath control A dynamic form of yoga that combines smooth movements and breath control A dynamic form of yoga that combines smooth movements and breath control",
//     img: "/assets/images/class1.jpg",
//     time:'1/1/1111'
//   },
//   {
//     id: 10,
//     type:'News Yoga FPTU',
//     name: "Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga",
//     describe: "Balancing body and mind through basic postures and breath control A dynamic form of yoga that combines smooth movements and breath control A dynamic form of yoga that combines smooth movements and breath control",
//     img: "/assets/images/class1.jpg",
//     time:'1/1/1111'
//   },
//   {
//     id: 11,
//     type:'Nutritional diet',
//     name: "Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga",
//     describe: "Balancing body and mind through basic postures and breath control A dynamic form of yoga that combines smooth movements and breath control A dynamic form of yoga that combines smooth movements and breath control",
//     img: "/assets/images/class1.jpg",
//     time:'1/1/1111'
//   },
//   {
//     id: 12,
//     type:'Practice',
//     name: "Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga Hatha Yoga",
//     describe: "Balancing body and mind through basic postures and breath control A dynamic form of yoga that combines smooth movements and breath control A dynamic form of yoga that combines smooth movements and breath control",
//     img: "/assets/images/class1.jpg",
//     time:'1/1/1111'
//   },
// ];
import request, { gql } from 'graphql-request'
import { useState } from 'react';
import { useEffect } from 'react';

export default async function Bloges(){
  const api = "https://api-ap-southeast-2.hygraph.com/v2/cljsnrl310fap01ukem39hr1n/master"
    const query = gql`
    query MyQuery {
      postsConnection(orderBy: createdAt_DESC) {
        edges {
          node {
            title
            slug
            description
            postContent {
              html
            }
            createdAt
            image {
              url
            }
            category
            
          }
        }
      }
    }
      `;
    return (await request(api,query)).postsConnection.edges;
}
