function getRandomUrl(urlArray) {
    // Validate input
    if (!Array.isArray(urlArray)) {
        throw new Error('Input should be an array');
    }

    // Ensure all elements in the array are strings
    if (urlArray.some(item => typeof item !== 'string')) {
        throw new Error('All elements in the array should be strings');
    }

    // Get the length of the array
    const length = urlArray.length;

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * length);

    // Return the string at the random index
    return urlArray[randomIndex];
}

//export const getRandomUrlBoat = () => {
//    const url = getRandomUrl(boatsUrlArray);
//    console.log(url)
//    return url;
//}

//hacerlo para vehiculos tambien

export const getRandomUrlBoat = async () => {
    const url = await getRandomUrl(boatsUrlArray);
    return url;
}// podria ser asi tmb.!

export const getRandomUrlVehicle = async () => {
    const url = await getRandomUrl(vehicleUrlArray);
    return url;
}// podria ser asi tmb.!
// Usage
const boatsUrlArray = ["https://imgs.search.brave.com/yvyVLCBhU2zjv2SYCHSSSh6iAmTxW94QXpvEgw_tHAY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTE3/NDg0MDQ3L3Bob3Rv/L3NhaWwtYm9hdC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/cmNZOXJLSzY1U3c3/a2otWkVzalBGZWhh/Tm5leFBaaWtyXy12/Nl9tRVFCTT0", 
"https://imgs.search.brave.com/l6o8FB981hpQm9pYynphFiIL1UFTjY2HY86mJIOE-sE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Rp/bGxlcm92aWN0b3Jp/YS5jb20uYXIvX25l/eHQvaW1hZ2U_dXJs/PS9fbmV4dC9zdGF0/aWMvbWVkaWEvZGlz/ZSVDMyVCMW9zLXVu/aWNvcy0yLmRiYTI2/OWU3LmpwZWcmdz0z/ODQwJnE9NzU", 
'https://imgs.search.brave.com/lBsLYhRMVLhiEQe29ITokOldAmO8fMOoSdUA66c5dE8/rs:fit:860:0:0/g:ce/aHR0cDovL3d3dy5s/YW5jaGFzYmVybXVk/YS5jb20uYXIvd3At/Y29udGVudC91cGxv/YWRzLzIwMTgvMDEv/Ny5qcGc',
"https://imgs.search.brave.com/uRF8DwN6JhLV-iLm67BcncNb8WRsuu_1KG68O646qAI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/LzlhLyhUaHJlZV9z/YWlsb3JzX29uX21v/dG9yX2xhdW5jaF9p/bl9TYW5fRGllZ29f/YmF5LilfLV9OQVJB/Xy1fMjk1NTgwLmpw/Zw",
"https://imgs.search.brave.com/YTp6LA08ANtlwXO1psIjeTod19Mp9MLNyBjys3bXv3c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQx/MjA0OTA3OC9waG90/by9yZWdhdHRhLXNh/aWxpbmctc2hpcC15/YWNodHMtd2l0aC13/aGl0ZS1zYWlscy1h/dC1vcGVuZWQtc2Vh/LWFlcmlhbC12aWV3/LW9mLXNhaWxib2F0/LWluLXdpbmR5Lndl/YnA_Yj0xJnM9NjEy/eDYxMiZ3PTAmaz0y/MCZjPTJkajZwdmVC/QnVBNGVMSm05UDZ0/aHNXY3FFb2toNWMy/VDlaOXFCLXlmWU09",
"https://imgs.search.brave.com/Tl2VoRQJlz9_zeHF34vDLUKp1PWxlOwmA936xD4MZ7M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/NzAxMjg3L3Bob3Rv/L2EtbHV4dXJ5LXlh/Y2h0LWluLW1vdGlv/bi1vbi10aGUtd2F0/ZXIud2VicD9iPTEm/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9bzBM/OHRZNlA2RWk2dnFl/QktCMVVpbGlQbm1Z/RFYyaXVpZkV1Q04z/VjNCYz0"];

const vehicleUrlArray = ["https://st.depositphotos.com/1905483/1811/i/450/depositphotos_18116423-stock-photo-ferarri-f430-supercar.jpg"];