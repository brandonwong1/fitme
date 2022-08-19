import React from 'react';
import exerciseDescriptions from './exerciseDescriptions.json';
// We need to import React in order to use JSX and access the public folder


export const TAGS = {
    LEGS: {
        tagName: "Legs",
        id: "legs"
    },
    NO_EQUIPMENT: {
        tagName: "No Equipment",
        id: "no-equipment"
    },
    CHEST: {
        tagName: "Chest",
        id: "chest"
    },
    BACK: {
        tagName: "Back",
        id: "back"
    },
    SHOULDERS: {
        tagName: "Shoulders",
        id: "shoulders"
    },
    ARMS: {
        tagName: "Arms",
        id: "arms"
    },
    ABS: {
        tagName: "Abs",
        id: "abs"
    },
    CARDIO: {
        tagName: "Cardio",
        id: "cardio"
    },
    BALANCE: {
        tagName: "Balance",
        id: "balance"
    },
    STRENGTH: {
        tagName: "Strength",
        id: "strength"
    }
}

// Learned about how to merge two arrays of objects via object ids here: https://stackoverflow.com/a/65103124/5015219

const data = [
    {
        id: "dumbbell-row",
        photo: process.env.PUBLIC_URL + "/img/exercises/row1.jpg",
        tags: [TAGS.BACK, TAGS.SHOULDERS, TAGS.ARMS, TAGS.STRENGTH],
    },
    {
        id: "dumbbell-overhead-press",
        photo: process.env.PUBLIC_URL + "/img/exercises/overheadPress.jpg",
        tags: [TAGS.SHOULDERS, TAGS.STRENGTH],
    },
    {
        id: "bulgarian-split-squat",
        photo: process.env.PUBLIC_URL + "/img/exercises/bgSquat1.jpg",
        tags: [TAGS.LEGS, TAGS.STRENGTH],
    },
    {
        id: "leg-press",
        photo: process.env.PUBLIC_URL + "/img/exercises/legPress1.jpg",
        tags: [TAGS.LEGS, TAGS.STRENGTH],
    },
    {
        id: "push-up",
        photo: process.env.PUBLIC_URL + "/img/exercises/pushup2.jpg",
        tags: [TAGS.ARMS, TAGS.NO_EQUIPMENT]
    },
    {
        id: "bodyweight-dips",
        photo: process.env.PUBLIC_URL + "/img/exercises/dip1.jpg",
        tags: [TAGS.ARMS, TAGS.SHOULDERS, TAGS.CHEST]
    },
    {
        id: "bodyweight-squat",
        photo: process.env.PUBLIC_URL + "/img/exercises/squat2.jpg",
        tags: [TAGS.LEGS, TAGS.NO_EQUIPMENT]
    },
    {
        id: "side-lunge",
        photo: process.env.PUBLIC_URL + "/img/exercises/sidelunge2.jpg",
        tags: [TAGS.LEGS, TAGS.NO_EQUIPMENT, TAGS.BALANCE]
    },
    {
        id: "lunge",
        photo: process.env.PUBLIC_URL + "/img/exercises/lunge2.jpg",
        tags: [TAGS.LEGS, TAGS.NO_EQUIPMENT, TAGS.BALANCE]
    },
    {
        id: 'abs-crunch',
        photo: process.env.PUBLIC_URL + "/img/exercises/situp2.jpg",
        tags: [TAGS.NO_EQUIPMENT, TAGS.ABS, TAGS.STRENGTH]
    },
    {
        id: 'plank',
        photo: process.env.PUBLIC_URL + "/img/exercises/plank.jpg",
        tags: [TAGS.NO_EQUIPMENT, TAGS.ABS, TAGS.BALANCE]
    },
    {
        id: 'v-hold',
        photo: process.env.PUBLIC_URL + "/img/exercises/powerV.jpg",
        tags: [TAGS.NO_EQUIPMENT, TAGS.ABS, TAGS.BALANCE]
    },
    {
        id: "jumping-jacks",
        photo: process.env.PUBLIC_URL + "/img/exercises/jumpJack2.jpg",
        tags: [TAGS.NO_EQUIPMENT, TAGS.CARDIO]
    },
    {
        id: "mountain-climbers",
        photo: process.env.PUBLIC_URL + "/img/exercises/mClimber1.jpg",
        tags: [TAGS.ABS, TAGS.CARDIO, TAGS.NO_EQUIPMENT]
    },
    {
        id: "skater-jumps",
        photo: process.env.PUBLIC_URL + "/img/exercises/skater1.jpg",
        tags: [TAGS.ABS, TAGS.CARDIO, TAGS.BALANCE, TAGS.NO_EQUIPMENT]
    }
]


export const EXERCISE_DATA = data.map(ex1 => ({...ex1, ...exerciseDescriptions.find(ex2 => ex2.id === ex1.id)}));
