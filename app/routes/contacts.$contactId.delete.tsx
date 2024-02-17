import { redirect, type ActionFunctionArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { deleteContact } from '../data.server';

export const action =async ({ params }: ActionFunctionArgs) => {
    invariant(params.contactId, 'Missing contact id data')

    await deleteContact(params.contactId)

    return redirect('/contacts')
}