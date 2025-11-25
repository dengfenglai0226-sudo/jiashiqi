import { MaterialItem, Step } from './types';

export const PROJECT_CONTEXT = `
You are an expert DIY assistant helping a user build a "PVC Pipe + Computer Fan Humidifier".
Project Details:
- Structure: 2m high x 1m wide x 0.2m deep PVC frame.
- Core: Double computer fans (12V) blowing onto a 200x100x20cm evaporative wet pad.
- Water: Recirculating system with a bottom reservoir (110x25x15cm) and 2x 12V pumps.
- Materials: 20mm PVC pipes, 12V 5A power supply, float switch for safety.
- Logic: Water is pumped to top, drips down pad, fans blow through pad to humidify air.
Answer questions specifically about this build, safety (electricity/water mixing), and assembly tips.
`;

export const MATERIALS: Record<string, MaterialItem[]> = {
  structure: [
    { name: 'PVC Pipe (Main)', spec: 'φ20mm, Hard', count: '8m', usage: 'Frame columns/beams' },
    { name: 'PVC Pipe (Water)', spec: 'φ16mm, Soft', count: '3m', usage: 'Pump connections' },
    { name: 'PVC Tee', spec: 'φ20mm', count: '4', usage: 'Joints' },
    { name: 'PVC Straight', spec: 'φ20mm', count: '6', usage: 'Extensions' },
    { name: 'PVC Elbow', spec: 'φ20mm', count: '8', usage: 'Corners' },
    { name: 'Clamps', spec: 'φ20mm', count: '12', usage: 'Wall fixing' },
  ],
  core: [
    { name: 'PC Fans', spec: '12cm, 12V, 40CFM', count: '2', usage: 'Airflow' },
    { name: 'Evap Pad', spec: '200x100x20cm', count: '1', usage: 'Evaporation surface' },
    { name: 'Water Pump', spec: '12V, 800L/h', count: '2', usage: 'Water circulation' },
    { name: 'Water Tank', spec: '110x25x15cm PP', count: '1', usage: 'Reservoir' },
    { name: 'Drip Pipe', spec: 'φ16mm w/ holes', count: '1', usage: 'Top distribution' },
  ],
  power: [
    { name: 'Power Adapter', spec: '12V/5A', count: '1', usage: 'Main power' },
    { name: 'Float Switch', spec: '12V', count: '1', usage: 'Run-dry protection' },
    { name: 'Filter Mesh', spec: '100 mesh', count: '1', usage: 'Pump protection' },
  ]
};

export const STEPS: Step[] = [
  { title: '1. Cut PVC Pipes', description: 'Cut pipes: 4x 200cm (Verticals), 4x 100cm (Horizontals), 4x 22cm (Depth spacers). Deburr edges.' },
  { title: '2. Frame Assembly', description: 'Assemble the bottom rectangle and top rectangle using Elbows and Tees. Connect them with the 200cm vertical pipes.' },
  { title: '3. Install Tank & Pumps', description: 'Place the water tank at the bottom. Install pumps inside with filter mesh. Route soft tubes up the side pillars.' },
  { title: '4. Mount Wet Pad', description: 'Insert the 20cm thick wet pad into the frame. It should sit securely between the columns.' },
  { title: '5. Fan Installation', description: 'Mount the 2 fans on the back of the frame using zip ties, blowing TOWARDS the wet pad.' },
  { title: '6. Electrical & Water', description: 'Connect pumps and fans to the 12V adapter. Install the drip pipe at the top. Test for leaks.' },
];
