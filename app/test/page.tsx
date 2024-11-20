import React from 'react';
import { getSamplesInsecure } from '../../database/samples';
import { getValidSession } from '../../database/sessions';

console.log(
  'session',
  await getValidSession(
    '7MgS6lZXg4TXlPMPo5QsiLHkqGKc83mvfHpjRg1QRxO+BdK3IPFGdztqinefp9DoJQzrxl/XllzZzarpAyITpKUCWAsvU+ONGRXh9n53v2Jz75e+AayHGr0utXIoMcruQ8adTQ==',
  ),
);

export default async function page() {
  const samples = await getSamplesInsecure();
  return (
    <div>
      {JSON.stringify(samples)}
      <p>
        Session information:
        {JSON.stringify(
          await getValidSession(
            '7MgS6lZXg4TXlPMPo5QsiLHkqGKc83mvfHpjRg1QRxO+BdK3IPFGdztqinefp9DoJQzrxl/XllzZzarpAyITpKUCWAsvU+ONGRXh9n53v2Jz75e+AayHGr0utXIoMcruQ8adTQ==',
          ),
        )}
      </p>
    </div>
  );
}
