import React, {useState} from 'react';
import {Form, useLoaderData} from '@remix-run/react';
import {adminAuthLoader} from '~/.server/admin/loaders/auth.login.loader';
import {adminAuthLoginAction} from '~/.server/admin/actions/auth.login.action';
import {Banner, Box, Button, Card, FormLayout, Text, TextField} from '@shopify/polaris';

export const action = adminAuthLoginAction;

export const loader = adminAuthLoader;

export default function Index() {
  const data = useLoaderData<typeof loader>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <Card>
      <Text as="h2" variant="headingSm">
        Admin CMS
      </Text>

      {data.error && (
        <Box paddingBlockStart="200">
          <Banner tone="warning">
            <p>
              {data.error?.message}
            </p>
          </Banner>
        </Box>
      )}

      <Box paddingBlockStart="200">
        <Form method="post">
          <FormLayout>
            <TextField
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={setEmail}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              autoComplete="on"
              value={password}
              onChange={setPassword}
            />

            <Button submit={true}>Sign In</Button>
          </FormLayout>
        </Form>
      </Box>
    </Card>
  );
}
