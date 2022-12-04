import config from "./apiConfig";
import app from "./app";

const {PORT} = config;

app.listen(PORT, () => {
    console.log('Server is running');
});