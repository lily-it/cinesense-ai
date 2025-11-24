🎬 CineSense – AI-Powered Movie Recommendation App

Your personal movie discovery companion — powered by TMDB, Supabase, and intelligent recommendation logic.

🌟 Overview

CineSense is a modern, AI-assisted movie recommendation platform designed to help users discover movies effortlessly.
It analyzes user preferences, browsing patterns, search behavior, and movie metadata to deliver personalized recommendations.

Built with a highly optimized tech stack — React + Vite + TypeScript + Supabase + TMDB — CineSense ensures blazing-fast performance and a clean, intuitive UI.

🚀 Live Demo

🔗 https://cinesense-movie.vercel.app

🛠 Tech Stack
🎨 Frontend

React (TypeScript)

Vite (super-fast build tool)

Tailwind-style custom CSS

TMDB Image CDN

Axios for API requests

🗄 Backend / Database

Supabase (Auth + PostgreSQL)

Supabase Functions (genre interest tracking)

Supabase Row-Level Security Policies

🎬 External API

TMDB API (for real-time movie data)

☁ Deployment

Vercel (Global Edge Network)

✨ Key Features
🔥 1. AI-Powered Movie Recommendations

CineSense provides tailored recommendations using:

genre similarity

trending data

user browsing behavior

watch history patterns

personalized interest scoring stored in Supabase

🎯 2. Personalized Genre Learning

Your app tracks:

genres of movies users view

genres they search

movies they interact with

This data builds a genre preference profile using a Supabase SQL function.

🔍 3. Intelligent Search

Search across thousands of movies with:

instant results

fuzzy matching

dynamic posters

🎞 4. Detailed Movie Page

Each movie page includes:

title, overview, rating

release date

backdrop posters

movie trailer

similar movie recommendations

📈 5. Trending Movies

Automatically fetched from TMDB Trending API:

daily trends

weekly trends

👤 6. User Authentication (Supabase Auth)

Sign up

Login

Logout

Persistent session

Personalized data per user

🌗 7. Clean UI & Responsive Layout

Optimized for:

desktop

tablet
