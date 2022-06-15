export default function loginOperation({ commerce  }) {
    async function login({ variables , res: response , config: cfg  }) {
        const config = commerce.getConfig(cfg);
        const { data  } = await config.fetch("account", "login", [
            variables
        ]);
        return {
            result: data
        };
    }
    return login;
};
