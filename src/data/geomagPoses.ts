export interface Joint {
  id: number;
  name: string;
  position: [number, number, number]; // [x, y, z]
}

export interface Connection {
  from: number; // Joint ID
  to: number;   // Joint ID
}

export interface GeomagPose {
  id: string;
  serial: string;
  year: string;
  title: string;
  description: string;
  joints: Joint[];
  connections: Connection[];
}

// Global anatomical connections for stickman (always identical for all poses)
export const geomagConnections: Connection[] = [
  { from: 0, to: 1 },   // Head to Neck
  { from: 1, to: 15 },  // Neck to Torso/Chest
  { from: 15, to: 2 },  // Torso to Pelvis
  { from: 15, to: 3 },  // Torso to Left Shoulder
  { from: 15, to: 4 },  // Torso to Right Shoulder
  { from: 3, to: 5 },   // Left Shoulder to Left Elbow
  { from: 4, to: 6 },   // Right Shoulder to Right Elbow
  { from: 5, to: 7 },   // Left Elbow to Left Hand
  { from: 6, to: 8 },   // Right Elbow to Right Hand
  { from: 2, to: 9 },   // Pelvis to Left Hip
  { from: 2, to: 10 },  // Pelvis to Right Hip
  { from: 9, to: 11 },  // Left Hip to Left Knee
  { from: 10, to: 12 }, // Right Hip to Right Knee
  { from: 11, to: 13 }, // Left Knee to Left Foot
  { from: 12, to: 14 }  // Right Knee to Right Foot
];

export const geomagPosesData: GeomagPose[] = [
  {
    id: 'walk_cycle',
    serial: 'POSE_01',
    year: '2026',
    title: 'WALK_CYCLE',
    description: 'An dynamic equilibrium capture of human bipedal motion. Features a balanced stride with opposite limb swings to offset rotational momentum.',
    connections: geomagConnections,
    joints: [
      { id: 0, name: 'Head', position: [0, 0.8, 0] },
      { id: 1, name: 'Neck', position: [0, 0.5, 0] },
      { id: 15, name: 'Torso', position: [0, 0.0, 0.05] },
      { id: 2, name: 'Pelvis', position: [0, -0.4, 0] },
      { id: 3, name: 'LeftShoulder', position: [-0.4, 0.4, 0.05] },
      { id: 4, name: 'RightShoulder', position: [0.4, 0.4, 0.05] },
      { id: 5, name: 'LeftElbow', position: [-0.6, 0.1, -0.3] },
      { id: 6, name: 'RightElbow', position: [0.6, 0.1, 0.3] },
      { id: 7, name: 'LeftHand', position: [-0.7, -0.2, -0.5] },
      { id: 8, name: 'RightHand', position: [0.7, -0.2, 0.5] },
      { id: 9, name: 'LeftHip', position: [-0.2, -0.4, 0] },
      { id: 10, name: 'RightHip', position: [0.2, -0.4, 0] },
      { id: 11, name: 'LeftKnee', position: [-0.25, -0.7, 0.3] },
      { id: 12, name: 'RightKnee', position: [0.25, -0.7, -0.3] },
      { id: 13, name: 'LeftFoot', position: [-0.3, -1.1, 0.5] },
      { id: 14, name: 'RightFoot', position: [0.3, -1.1, -0.5] }
    ]
  },
  {
    id: 'run_sprint',
    serial: 'POSE_02',
    year: '2026',
    title: 'RUN_SPRINT',
    description: 'High velocity translation model. Center of mass is shifted forward. Extensors are fully engaged, and joints are placed at maximum flexion limits.',
    connections: geomagConnections,
    joints: [
      { id: 0, name: 'Head', position: [0.2, 0.7, 0] },
      { id: 1, name: 'Neck', position: [0.15, 0.45, 0] },
      { id: 15, name: 'Torso', position: [0.0, 0.0, 0.0] },
      { id: 2, name: 'Pelvis', position: [-0.15, -0.4, 0] },
      { id: 3, name: 'LeftShoulder', position: [-0.25, 0.4, 0.1] },
      { id: 4, name: 'RightShoulder', position: [0.45, 0.4, -0.1] },
      { id: 5, name: 'LeftElbow', position: [-0.4, 0.2, 0.5] },
      { id: 6, name: 'RightElbow', position: [0.6, 0.0, -0.6] },
      { id: 7, name: 'LeftHand', position: [-0.5, 0.1, 0.7] },
      { id: 8, name: 'RightHand', position: [0.7, -0.3, -0.8] },
      { id: 9, name: 'LeftHip', position: [-0.3, -0.4, 0] },
      { id: 10, name: 'RightHip', position: [0.0, -0.4, 0] },
      { id: 11, name: 'LeftKnee', position: [-0.1, -0.6, 0.6] },
      { id: 12, name: 'RightKnee', position: [-0.2, -0.8, -0.6] },
      { id: 13, name: 'LeftFoot', position: [0.1, -1.0, 0.8] },
      { id: 14, name: 'RightFoot', position: [-0.4, -1.2, -0.8] }
    ]
  },
  {
    id: 'jump_airborne',
    serial: 'POSE_03',
    year: '2026',
    title: 'JUMP_AIRBORNE',
    description: 'Anti-gravitational tension study. The spine arches backward while knees are tucked high. Dynamic vectors extend outward into vertical free-fall.',
    connections: geomagConnections,
    joints: [
      { id: 0, name: 'Head', position: [0, 0.9, -0.1] },
      { id: 1, name: 'Neck', position: [0, 0.6, -0.1] },
      { id: 15, name: 'Torso', position: [0, 0.1, 0] },
      { id: 2, name: 'Pelvis', position: [0, -0.3, 0] },
      { id: 3, name: 'LeftShoulder', position: [-0.4, 0.5, 0] },
      { id: 4, name: 'RightShoulder', position: [0.4, 0.5, 0] },
      { id: 5, name: 'LeftElbow', position: [-0.7, 1.0, 0.2] },
      { id: 6, name: 'RightElbow', position: [0.7, 1.0, 0.2] },
      { id: 7, name: 'LeftHand', position: [-0.8, 1.4, 0.4] },
      { id: 8, name: 'RightHand', position: [0.8, 1.4, 0.4] },
      { id: 9, name: 'LeftHip', position: [-0.2, -0.3, 0] },
      { id: 10, name: 'RightHip', position: [0.2, -0.3, 0] },
      { id: 11, name: 'LeftKnee', position: [-0.4, -0.6, 0.4] },
      { id: 12, name: 'RightKnee', position: [0.4, -0.6, 0.4] },
      { id: 13, name: 'LeftFoot', position: [-0.3, -0.9, 0.1] },
      { id: 14, name: 'RightFoot', position: [0.3, -0.9, 0.1] }
    ]
  },
  {
    id: 'landing',
    serial: 'POSE_04',
    year: '2026',
    title: 'LANDING',
    description: 'Kinetic energy absorption configuration. A deep crouch designed to safely distribute descending force across joint suspension segments.',
    connections: geomagConnections,
    joints: [
      { id: 0, name: 'Head', position: [0, 0.2, 0.3] },
      { id: 1, name: 'Neck', position: [0, 0.0, 0.2] },
      { id: 15, name: 'Torso', position: [0, -0.3, 0.1] },
      { id: 2, name: 'Pelvis', position: [0, -0.6, -0.1] },
      { id: 3, name: 'LeftShoulder', position: [-0.4, -0.1, 0.1] },
      { id: 4, name: 'RightShoulder', position: [0.4, -0.1, 0.1] },
      { id: 5, name: 'LeftElbow', position: [-0.7, -0.4, 0.3] },
      { id: 6, name: 'RightElbow', position: [0.7, -0.4, 0.3] },
      { id: 7, name: 'LeftHand', position: [-0.9, -0.7, 0.5] },
      { id: 8, name: 'RightHand', position: [0.9, -0.7, 0.5] },
      { id: 9, name: 'LeftHip', position: [-0.2, -0.6, 0] },
      { id: 10, name: 'RightHip', position: [0.2, -0.6, 0] },
      { id: 11, name: 'LeftKnee', position: [-0.5, -1.0, 0.3] },
      { id: 12, name: 'RightKnee', position: [0.5, -1.0, 0.3] },
      { id: 13, name: 'LeftFoot', position: [-0.4, -1.3, 0.1] },
      { id: 14, name: 'RightFoot', position: [0.4, -1.3, 0.1] }
    ]
  },
  {
    id: 'sitting_relax',
    serial: 'POSE_05',
    year: '2026',
    title: 'SITTING_RELAX',
    description: 'Passive skeletal rest posture. Minimal muscular force is generated. Structural lines fall naturally into gravity-governed seating alignment.',
    connections: geomagConnections,
    joints: [
      { id: 0, name: 'Head', position: [-0.1, 0.6, -0.1] },
      { id: 1, name: 'Neck', position: [-0.1, 0.3, -0.1] },
      { id: 15, name: 'Torso', position: [0.0, -0.1, -0.1] },
      { id: 2, name: 'Pelvis', position: [0.1, -0.5, 0.0] },
      { id: 3, name: 'LeftShoulder', position: [-0.3, 0.1, 0.0] },
      { id: 4, name: 'RightShoulder', position: [0.3, 0.1, 0.0] },
      { id: 5, name: 'LeftElbow', position: [-0.6, -0.2, 0.3] },
      { id: 6, name: 'RightElbow', position: [0.6, -0.2, 0.3] },
      { id: 7, name: 'LeftHand', position: [-0.7, -0.4, 0.5] },
      { id: 8, name: 'RightHand', position: [0.7, -0.4, 0.5] },
      { id: 9, name: 'LeftHip', position: [-0.2, -0.5, 0.3] },
      { id: 10, name: 'RightHip', position: [0.2, -0.5, 0.3] },
      { id: 11, name: 'LeftKnee', position: [-0.3, -0.9, 0.6] },
      { id: 12, name: 'RightKnee', position: [0.3, -0.9, 0.6] },
      { id: 13, name: 'LeftFoot', position: [-0.3, -1.3, 0.7] },
      { id: 14, name: 'RightFoot', position: [0.3, -1.3, 0.7] }
    ]
  },
  {
    id: 'thinking',
    serial: 'POSE_06',
    year: '2026',
    title: 'THINKING',
    description: 'Asymmetric cognitive loading. One hand is drawn upward to contact the head, while the opposing arm forms a stable horizontal support shelf.',
    connections: geomagConnections,
    joints: [
      { id: 0, name: 'Head', position: [0, 0.75, 0.1] },
      { id: 1, name: 'Neck', position: [0, 0.5, 0.05] },
      { id: 15, name: 'Torso', position: [0, 0.0, 0.0] },
      { id: 2, name: 'Pelvis', position: [0, -0.4, 0] },
      { id: 3, name: 'LeftShoulder', position: [-0.4, 0.4, 0] },
      { id: 4, name: 'RightShoulder', position: [0.4, 0.4, 0] },
      { id: 5, name: 'LeftElbow', position: [-0.3, 0.0, 0.4] },
      { id: 6, name: 'RightElbow', position: [0.5, 0.1, 0.3] },
      { id: 7, name: 'LeftHand', position: [0.2, 0.0, 0.4] },
      { id: 8, name: 'RightHand', position: [0.0, 0.55, 0.3] },
      { id: 9, name: 'LeftHip', position: [-0.2, -0.4, 0] },
      { id: 10, name: 'RightHip', position: [0.2, -0.4, 0] },
      { id: 11, name: 'LeftKnee', position: [-0.25, -0.8, 0] },
      { id: 12, name: 'RightKnee', position: [0.25, -0.8, 0] },
      { id: 13, name: 'LeftFoot', position: [-0.3, -1.2, 0] },
      { id: 14, name: 'RightFoot', position: [0.3, -1.2, 0] }
    ]
  },
  {
    id: 'victory',
    serial: 'POSE_07',
    year: '2026',
    title: 'VICTORY',
    description: 'Maximum expansion of personal space. Double elevated arms form a high-contrast V-shape, and ground contact vectors are placed wide.',
    connections: geomagConnections,
    joints: [
      { id: 0, name: 'Head', position: [0, 0.85, 0] },
      { id: 1, name: 'Neck', position: [0, 0.55, 0] },
      { id: 15, name: 'Torso', position: [0, 0.05, 0] },
      { id: 2, name: 'Pelvis', position: [0, -0.35, 0] },
      { id: 3, name: 'LeftShoulder', position: [-0.4, 0.45, 0] },
      { id: 4, name: 'RightShoulder', position: [0.4, 0.45, 0] },
      { id: 5, name: 'LeftElbow', position: [-0.8, 1.0, 0] },
      { id: 6, name: 'RightElbow', position: [0.8, 1.0, 0] },
      { id: 7, name: 'LeftHand', position: [-1.1, 1.5, 0] },
      { id: 8, name: 'RightHand', position: [1.1, 1.5, 0] },
      { id: 9, name: 'LeftHip', position: [-0.2, -0.35, 0] },
      { id: 10, name: 'RightHip', position: [0.2, -0.35, 0] },
      { id: 11, name: 'LeftKnee', position: [-0.4, -0.8, 0] },
      { id: 12, name: 'RightKnee', position: [0.4, -0.8, 0] },
      { id: 13, name: 'LeftFoot', position: [-0.6, -1.2, 0] },
      { id: 14, name: 'RightFoot', position: [0.6, -1.2, 0] }
    ]
  },
  {
    id: 'pointing',
    serial: 'POSE_08',
    year: '2026',
    title: 'POINTING',
    description: 'Directional spatial orientation study. The right upper limb projects a straight, target-directed vector, while the left arm anchors on the hip.',
    connections: geomagConnections,
    joints: [
      { id: 0, name: 'Head', position: [0, 0.8, 0.05] },
      { id: 1, name: 'Neck', position: [0, 0.5, 0.05] },
      { id: 15, name: 'Torso', position: [0, 0.0, 0.0] },
      { id: 2, name: 'Pelvis', position: [0, -0.4, 0] },
      { id: 3, name: 'LeftShoulder', position: [-0.4, 0.4, 0] },
      { id: 4, name: 'RightShoulder', position: [0.4, 0.4, 0] },
      { id: 5, name: 'LeftElbow', position: [-0.6, 0.1, -0.2] },
      { id: 6, name: 'RightElbow', position: [0.7, 0.4, 0.4] },
      { id: 7, name: 'LeftHand', position: [-0.4, -0.1, -0.3] },
      { id: 8, name: 'RightHand', position: [1.3, 0.4, 0.8] },
      { id: 9, name: 'LeftHip', position: [-0.2, -0.4, 0] },
      { id: 10, name: 'RightHip', position: [0.2, -0.4, 0] },
      { id: 11, name: 'LeftKnee', position: [-0.2, -0.8, 0.1] },
      { id: 12, name: 'RightKnee', position: [0.25, -0.8, -0.1] },
      { id: 13, name: 'LeftFoot', position: [-0.25, -1.2, 0.2] },
      { id: 14, name: 'RightFoot', position: [0.3, -1.2, -0.1] }
    ]
  }
];
