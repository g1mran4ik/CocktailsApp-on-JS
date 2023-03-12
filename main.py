from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# from typing import List
import random
import string
import numpy as np
import pandas as pd

app = FastAPI()

origins = [
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static/", StaticFiles(directory="static"))


@app.get("/", response_class=FileResponse)
async def read_item():
    return FileResponse("./test.html")


class Cocktail(BaseModel):
    cocktailName: str
    cocktailImg: str
    liked: int
    disliked: int
    # cocktailIngreds: List[str]

class CocktailReact(BaseModel):
    id: str
    name: str
    image: str
    liked: int
    disliked: int


class UserData(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    token: str


class Username(BaseModel):
    username: str

@app.post("/likeData/")
async def create_item(cocktail: Cocktail):
    data = pd.read_excel("./cocktails.xlsx")
    prev_cocktail_name = np.array(data["Имя коктейля"])
    prev_cocktail_img = np.array(data["Изображение"])
    prev_cocktail_like = np.array(data["Like"])
    prev_cocktail_dislike = np.array(data["Dislike"])
    cocktail_name_list = np.append(prev_cocktail_name, [cocktail.cocktailName])
    # prev_cocktail_ingreds = np.array(data['Ингредиенты'])

    df = pd.DataFrame(
        {
            "Имя коктейля": cocktail_name_list,
            "Изображение": np.append(prev_cocktail_img, [cocktail.cocktailImg]),
            "Like": np.append(prev_cocktail_like, [cocktail.liked]),
            "Dislike": np.append(prev_cocktail_dislike, [cocktail.disliked])
            # "Ингредиенты": np.append(prev_cocktail_ingreds, [cocktail.cocktailIngreds])
        }
    )
    grouped = df.groupby(["Имя коктейля", "Изображение"]).sum()
    grouped.to_excel("./cocktails.xlsx")
    return cocktail_name_list.tolist()

@app.post("/like-data/")
async def create_item(cocktail: CocktailReact):
    data = pd.read_excel("./cocktailsReact.xlsx")
    prev_cocktail_name = np.array(data["Имя коктейля"])
    prev_cocktail_img = np.array(data["Изображение"])
    prev_cocktail_like = np.array(data["Like"])
    prev_cocktail_dislike = np.array(data["Dislike"])
    prev_cocktail_id = np.array(data["CocktailId"])
    cocktail_name_list = np.append(prev_cocktail_name, [cocktail.name])
    # prev_cocktail_ingreds = np.array(data['Ингредиенты'])

    df = pd.DataFrame(
        {
            "Имя коктейля": cocktail_name_list,
            "Изображение": np.append(prev_cocktail_img, [cocktail.image]),
            "Like": np.append(prev_cocktail_like, [cocktail.liked]),
            "Dislike": np.append(prev_cocktail_dislike, [cocktail.disliked]),
            "CocktailId": np.append(prev_cocktail_id, [cocktail.id]),  
            # "Ингредиенты": np.append(prev_cocktail_ingreds, [cocktail.cocktailIngreds])
        }
    )
    grouped = df.groupby(["Имя коктейля", "Изображение", "CocktailId"]).sum()
    grouped.to_excel("./cocktailsReact.xlsx")
    return cocktail_name_list.tolist()


@app.get("/mostPopular")
async def get_popular_drinks():
    full_df = pd.read_excel("./cocktails.xlsx")
    liked_df = full_df[full_df["Like"] > 0]
    most_liked_df = liked_df.nlargest(8, "Like")
    cocktail_favourite_img = np.array(most_liked_df["Изображение"])
    return cocktail_favourite_img.tolist()


@app.get("/AllGeneratedImg")
async def get_all_img():
    full_df = pd.read_excel("./cocktails.xlsx")
    all_cocktails_img = np.array(full_df["Изображение"])
    return all_cocktails_img.tolist()


@app.get("/AllGeneratedNames")
async def get_all_names():
    full_df = pd.read_excel("./cocktails.xlsx")
    all_cocktails_names = np.array(full_df["Имя коктейля"])
    return all_cocktails_names.tolist()


@app.get("/all-generated-cocktails")
async def get_all_img():
    full_df = pd.read_excel("./cocktailsReact.xlsx")
    return [
        {"id": id, "image": image, "name": name, "liked": liked, "disliked": disliked}
        for id, image, name, liked, disliked in np.array(full_df[["CocktailId", "Изображение", "Имя коктейля", "Like", "Dislike"]]).tolist()
    ]


@app.get("/most-popular/")
async def get_popular_drinks():
    full_df = pd.read_excel("./cocktailsReact.xlsx")
    liked_df = full_df[full_df["Like"] > 0]
    most_liked_df = liked_df.nlargest(8, "Like")
    return [
        {"id": id, "image": image, "name": name, "liked": liked, "disliked": disliked}
        for id, image, name, liked, disliked in np.array(
            most_liked_df[["CocktailId", "Изображение", "Имя коктейля", "Like", "Dislike"]]
        ).tolist()
    ]


@app.post("/user-data/")
async def create_data(userdata: UserData):
    data = pd.read_excel("./userdata.xlsx")
    prev_username = np.array(data["Имя пользователя"])
    prev_password = np.array(data["Пароль"])
    prev_token = np.array(data["Токен"])
    user_name_list = np.append(prev_username, [userdata.username])

    dfUser = pd.DataFrame(
        {
            "Имя пользователя": user_name_list,
            "Пароль": np.append(prev_password, [userdata.password]),
            "Токен": np.append(prev_token, [""]),
        }
    )
    dfUser.to_excel("./userdata.xlsx")
    return user_name_list.tolist()


@app.post("/login/")
async def login(userdata: UserData):
    data = pd.read_excel("./userdata.xlsx")
    row = data.loc[
        (data["Имя пользователя"] == userdata.username)
        & (data["Пароль"] == userdata.password)
    ]
    if len(np.array(row)):
        token = "".join(random.choice(string.ascii_lowercase) for i in range(10))
        data.at[[i for i in np.array(row)][0][0], "Токен"] = token
        data.to_excel("./userdata.xlsx")
        return token
    else:
        raise HTTPException(status_code=404, detail="User not found")


@app.post("/user-me/")
async def user_me(token: Token):
    data = pd.read_excel("./userdata.xlsx")
    row = data.loc[data["Токен"] == token.token]
    if len(np.array(row)):
        return row["Имя пользователя"]
    else:
        raise HTTPException(status_code=404, detail="Invalid token")


@app.post("/validate-username/")
async def validate_username(username: Username):
    data = pd.read_excel("./userdata.xlsx")
    row = data.loc[data["Имя пользователя"] == username.username]
    if len(np.array(row)):
        raise HTTPException(status_code=404, detail="This username already exists")
    else:
        return []
