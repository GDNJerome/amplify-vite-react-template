import { useEffect, useMemo, useState } from "react";
import { useAuthenticator, Table, TableBody, TableCell, TableHead, TableRow } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

type Lightsail = NonNullable<NonNullable<Schema["getAllLightsails"]["returnType"]>[number]>;
type Scheduler = NonNullable<NonNullable<Schema["getSchedulers"]["returnType"]>[number]>;

function formatDate(iso: string | null | undefined): string {
    if (!iso) return "--";
    const d = new Date(iso);
    return isNaN(d.getTime()) ? "--" : d.toLocaleString();
}


function App() {
  const [client] = useState(() => generateClient<Schema>());

  const { user, signOut } = useAuthenticator();

    async function sayHello(val: string) : Promise<string> {
      const {data} = await client.queries.sayHello({ name: val })
      return data ?? '';
    }

    const [hello, setHello] = useState<string>("");

    useEffect(() => {
        sayHello("world").then(setHello);
      }, []); // re-run if `val` changes — add it to deps

    async function getAllLightsails() : Promise<Lightsail[]> {
        const { data } = await client.queries.getAllLightsails();
        return (data ?? []).filter((i): i is Lightsail => i !== null);
    }

    const [lightsails, setLightsails] = useState<Lightsail[]>([]);

    useEffect(() => {
        getAllLightsails().then(setLightsails);
    }, []);

    async function getSchedulers() : Promise<Scheduler[]> {
        const { data } = await client.queries.getSchedulers();
        return (data ?? []).filter((i): i is Scheduler => i !== null);
    }

    const [schedulers, setSchedulers] = useState<Scheduler[]>([]);

    useEffect(() => {
        getSchedulers().then(setSchedulers);
    }, []);

    const deleteDateByName = useMemo(() => {
        const map = new Map<string, string>();
        for (const s of schedulers) {
            if (s.Name && s.DeleteDate) map.set(s.Name, s.DeleteDate);
        }
        return map;
    }, [schedulers]);

  return (
    <main>
        <h1>{user?.signInDetails?.loginId}'s todos</h1>
        <h2>str : {hello}</h2>


        <h2>Lightsails</h2>
        <Table
            caption=""
            highlightOnHover={false}>
            <TableHead>
                <TableRow>
                    <TableCell as="th">Name</TableCell>
                    <TableCell as="th">Public IP</TableCell>
                    <TableCell as="th">State</TableCell>
                    <TableCell as="th">Started at</TableCell>
                    <TableCell as="th">End at</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {lightsails.map((ls) => (
                    <TableRow key={ls.arn ?? ls.name}>
                        <TableCell>{ls.name}</TableCell>
                        <TableCell>{ls.publicIpAddress ?? "no public ip"}</TableCell>
                        <TableCell>{ls.state ?? "unknown"}</TableCell>
                        <TableCell>{formatDate(ls.createdAt)}</TableCell>
                        <TableCell>{formatDate(ls.name ? deleteDateByName.get(ls.name) : undefined)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
