import {Pool, PoolConfig} from "pg"

//Omit propeties of type key and pick the properties
type WithRequired<Type, Key extends keyof Type> = 
    Omit<Type, Key> &  Required<Pick<Type, Key>>;

//Collect all required props of our config
type PoolConfigRequired = 
    WithRequired<PoolConfig, 'user'> & 
    WithRequired<PoolConfig, 'password'> &
    WithRequired<PoolConfig, 'host'> &
    WithRequired<PoolConfig, 'port'> &
    WithRequired<PoolConfig, 'database'>

const config: PoolConfigRequired = {
    user: "postgres",
    password: "$omeLove43571",
    host: "localhost", 
    port: 5432, 
    database: "newssite"
}

const localPool: Pool = new Pool(config);

export default localPool;