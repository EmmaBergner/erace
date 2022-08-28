import jwtDecode from "jwt-decode";
import { axiosReq, axiosRes } from "../api/axiosDefault"

export const fetchMoreData = async (resource, setResource) => {
    try {
        const { data } = await axiosReq.get(resource.next)
        setResource(prevResource => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some((accResult) => accResult.id === cur.id)
                    ? acc : [...acc, cur];
            }, prevResource.results),
        }));
    } catch (err) { }
};

export const handleDeactivate = async (path, idProp, idValue, id, setRaces) => {
    try {
        await axiosRes.delete(path + idValue);
        setRaces((prevRaces) => ({
            ...prevRaces,
            results: prevRaces.results.map((race) => {
                let update = { ...race }
                update[idProp] = null
                return race.id === id
                    ? update
                    : race;
            }),
        }));
    } catch (err) {
        console.log(err);
    }
}

export const handleActivate = async (path, idProp, id, setRaces, currentUser) => {
    try {
        const { data } = await axiosRes.post(path, { owner: currentUser.pk, race: id });
        setRaces((prevRaces) => ({
            ...prevRaces,
            results: prevRaces.results.map((race) => {
                let update = { ...race }
                update[idProp] = data.id
                return race.id === id
                    ? update
                    : race;
            }),
        }));
    } catch (err) {
        console.log(err);
    }
};

export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
  };
  
  export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp");
  };
  
  export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
  };
