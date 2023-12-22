import fetch from "node-fetch";
import fs from "node:fs";

const PAGINATION_END_LIMIT = 108;

const MAIN_OBJ = { colleges: [] };

const main = async () => {
    for (let i = 1; i < PAGINATION_END_LIMIT; i++) {
        console.log(
            `requesting https://www.niche.com/api/renaissance/results/?type=private&type=public&listURL=best-colleges&page=${
                i + 1
            }&searchType=college`
        );
        try {
            const req = await fetch(
                `https://www.niche.com/api/renaissance/results/?type=private&type=public&listURL=best-colleges&page=${
                    i + 1
                }&searchType=college`,
                {
                    headers: {
                        accept: "application/json",
                        cookie: "xid=f2f528e1-0c89-44bf-9dbc-b016ca6fdc63; experiments=lite_reg_before_k12_survey%7Ccontrol%5E%5E%5E%240%7C1%5D; _gcl_au=1.1.1798530535.1703023409; niche_npsSurvey=0; _tt_enable_cookie=1; _ttp=jw-uM7RtPf4NS9bd6gbwWKM895x; _gid=GA1.2.567595296.1703023409; _rdt_uuid=1703023409080.a075258e-3d47-4bd1-a9f0-914f1f81cba4; _scid=f8bee4e7-4d7c-4859-802d-a51ce3b72589; _fbp=fb.1.1703023409228.1737227692; _clck=1mfsl8n%7C2%7Cfho%7C0%7C1448; _pxvid=71442466-9eba-11ee-86c7-fcfc42689fa6; pxcts=71443313-9eba-11ee-86c7-d55970b8392e; _sctr=1%7C1702962000000; niche_cookieConsent=true; navigation=%7B%22location%22%3A%7B%22guid%22%3A%22f931a1cd-e1b4-44bb-9e2c-b0d3e9241e98%22%2C%22type%22%3A%22Country%22%2C%22name%22%3A%22America%22%2C%22url%22%3A%22%22%7D%2C%22navigationMode%22%3A%22full%22%2C%22vertical%22%3A%22colleges%22%2C%22mostRecentVertical%22%3A%22colleges%22%2C%22suffixes%22%3A%7B%22colleges%22%3A%22%22%2C%22graduate-schools%22%3A%22%22%2C%22k12%22%3A%22%22%2C%22places-to-live%22%3A%22%22%2C%22places-to-work%22%3A%22%22%7D%7D; ab.storage.deviceId.97a5be8e-e2ba-4f2c-9159-9ae910fa9648=%7B%22g%22%3A%22f0d13e35-03b7-eebd-c916-6074c27a9a11%22%2C%22c%22%3A1703023412561%2C%22l%22%3A1703023412561%7D; ab.storage.sessionId.97a5be8e-e2ba-4f2c-9159-9ae910fa9648=%7B%22g%22%3A%221a3e9796-ea50-83fe-47fd-8f6fadfd6000%22%2C%22e%22%3A1703025212565%2C%22c%22%3A1703023412560%2C%22l%22%3A1703023412565%7D; _scid_r=f8bee4e7-4d7c-4859-802d-a51ce3b72589; _ga=GA1.1.830486839.1703023409; _uetsid=70ee7dc09eba11ee821413efd050ab37; _uetvid=70ee86e09eba11ee923c072a0ac5137f; _px3=6c55dfdf104a95cf1a56ddb25c72705b136ab0ac84239ddf39cd7dfee8e7a086:caVo9E57Et+2yxon2Lk6MYZF1o2qK6kyalQZADyrEXY8EKhUg3qgrnqtzbHPRtbTpPwq6F+UeTLDHETyZW5/Qw==:1000:3wvC1njTd1KjMSPvM5T4UQZiBrHV6rZm7Yy128ZY1UXAsFGDemPUM55wtlwotTjoFGolALyodtcgXvv2ztZVaKmAXtIOv5Yz6vXrK22kEGxAmrMqyftyouvSxOwtAqBuy/srxgpDu6YEb6BBTX9qq9hN/g/RHj7GJ1oPUwfQgm+wZc1Vsb3la24wgqebWpHGDqj4eNmfjz7uSF3fWfqdIZG9cVNvvIjQ54RRya0qCik=; __gads=ID=32576b469ef323aa:T=1703023415:RT=1703027986:S=ALNI_MZTsNJCvNPdKc77qKgzjAs_x8_n0A; __gpi=UID=00000daba8f9495f:T=1703023415:RT=1703027986:S=ALNI_MbORLkeSIbM6PTgm1e01dB0jNBsjA; _dc_gtm_UA-2431522-39=1; niche_sessionPageCount=5; _ga_4TVMRNQ02W=GS1.1.1703027999.2.0.1703027999.0.0.0; _clsk=scbs6q%7C1703027999791%7C2%7C1%7Cz.clarity.ms%2Fcollect",
                        Referer:
                            "https://www.niche.com/colleges/search/best-colleges/?page=108",
                        "Referrer-Policy": "strict-origin-when-cross-origin",
                    },
                    body: null,
                    method: "GET",
                }
            );
        } catch (err) {
            fs.writeFileSync("data.json", JSON.stringify(MAIN_OBJ), "utf-8");
            break;
        }
        const json = await req.json();
        MAIN_OBJ.colleges.push(...json.entities);
        new Promise((resolve) => setTimeout(resolve, 1000));
    }
    fs.writeFileSync("data.json", JSON.stringify(MAIN_OBJ), "utf-8");
};

main();
