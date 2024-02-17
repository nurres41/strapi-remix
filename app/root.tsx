/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LinksFunction } from "@remix-run/node";
import appStyleHref from './app.css'
import {
  Form,
  Links,
  LiveReload,
  Meta,
  Scripts,
  Outlet,
  ScrollRestoration,
  useLoaderData,
  Link,
  json,
  useRouteError,
  isRouteErrorResponse
} from "@remix-run/react";
import { getContacts } from "./data.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStyleHref }
];

export async function loader() {
  const contacts = await getContacts()
  return json(contacts)
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="root-error">
        <h1>
          Oops, Game Over!.
        </h1>
        <p>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error
            ? error.message
            : "Unknown Error"}
        </p>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // data, loader fonksiyonunun return ettigi data tipini kullanir
  const contacts = useLoaderData<typeof loader>()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
            </Form>
            <Link to="contacts/create" className="buttonLink"> Create</Link>
          </div>
          <nav>
          {contacts.length ? (
              <ul>
                {contacts.map((contact : any) => (
                  <li key={contact.id}>
                    <Link to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite ? (
                        <span>★</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>

        <div id="detail">
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
