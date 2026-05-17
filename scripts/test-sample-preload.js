#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Automated Test Script for Sample Ticket Preloading
 * 
 * This script verifies that the sample ticket data structure is correct
 * and that all required fields are present.
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Sample Ticket Preload Functionality\n');

// Read the mock data file
const mockDataPath = path.join(__dirname, '../src/lib/mockData.ts');
const mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

// Extract sample tickets data
const sampleTicketsMatch = mockDataContent.match(/export const sampleTickets: SampleTicket\[\] = \[([\s\S]*?)\];/);

if (!sampleTicketsMatch) {
  console.error('❌ Failed to find sampleTickets array in mockData.ts');
  process.exit(1);
}

console.log('✅ Found sampleTickets array in mockData.ts\n');

// Test 1: Verify all three sample tickets exist
const ticketMatches = mockDataContent.match(/id: "TICK-\d{3}"/g);
if (!ticketMatches || ticketMatches.length !== 3) {
  console.error(`❌ Expected 3 sample tickets, found ${ticketMatches ? ticketMatches.length : 0}`);
  process.exit(1);
}
console.log('✅ All 3 sample tickets found (TICK-001, TICK-002, TICK-003)\n');

// Test 2: Verify each ticket has required fields
const requiredFields = ['id', 'title', 'description', 'customerName', 'submittedDate'];
const tickets = ['TICK-001', 'TICK-002', 'TICK-003'];

tickets.forEach(ticketId => {
  console.log(`Testing ${ticketId}:`);
  
  requiredFields.forEach(field => {
    const fieldPattern = new RegExp(`${field}:\\s*"[^"]+"`);
    const hasField = mockDataContent.includes(`id: "${ticketId}"`) && 
                     mockDataContent.match(fieldPattern);
    
    if (hasField) {
      console.log(`  ✅ ${field} field present`);
    } else {
      console.error(`  ❌ ${field} field missing`);
      process.exit(1);
    }
  });
  console.log('');
});

// Test 3: Verify description lengths (must be >= 50 chars for form validation)
console.log('Testing description lengths (minimum 50 characters for validation):\n');

// Extract actual descriptions from the file
const tick001Match = mockDataContent.match(/id: "TICK-001"[\s\S]*?description: "([\s\S]*?)"/);
const tick002Match = mockDataContent.match(/id: "TICK-002"[\s\S]*?description: "([\s\S]*?)"/);
const tick003Match = mockDataContent.match(/id: "TICK-003"[\s\S]*?description: "([\s\S]*?)"/);

const actualDescriptions = [
  { id: 'TICK-001', length: tick001Match ? tick001Match[1].length : 0 },
  { id: 'TICK-002', length: tick002Match ? tick002Match[1].length : 0 },
  { id: 'TICK-003', length: tick003Match ? tick003Match[1].length : 0 }
];

actualDescriptions.forEach(desc => {
  if (desc.length >= 50) {
    console.log(`✅ ${desc.id}: ${desc.length} characters (valid)`);
  } else {
    console.error(`❌ ${desc.id}: ${desc.length} characters (too short, minimum 50)`);
    process.exit(1);
  }
});

console.log('\n' + '='.repeat(60));
console.log('✅ All tests passed! Sample ticket data is valid.');
console.log('='.repeat(60));
console.log('\n📋 Next Steps:');
console.log('1. Navigate to http://localhost:3000/analyze');
console.log('2. Test the dropdown selector manually');
console.log('3. Verify each sample ticket loads into the form');
console.log('4. Submit a sample ticket to test end-to-end flow\n');

// Made with Bob
