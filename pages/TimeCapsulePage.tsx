
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { AnyUser, TimeCapsule } from '../types';

// Mock data for time capsules
const initialTimeCapsules: TimeCapsule[] = [
  { id: 1, title: 'Message from your Freshman Year', creatorId: 4, recipientId: 4, releaseDate: '2026-06-01', status: 'Sealed', createdAt: '2022-09-01' },
  { id: 2, title: 'For my favorite student', creatorId: 6, recipientId: 5, releaseDate: '2025-05-20', status: 'Sealed', createdAt: '2023-01-15' },
];

interface TimeCapsulePageProps {
  currentUser: AnyUser;
  users: AnyUser[];
}

const TimeCapsulePage: React.FC<TimeCapsulePageProps> = ({ currentUser, users }) => {
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsule[]>(initialTimeCapsules);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const myCapsules = timeCapsules.filter(tc => tc.creatorId === currentUser.id || tc.recipientId === currentUser.id);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Time Capsule</h1>
        <button onClick={() => setShowCreateModal(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition">
          Create New Capsule
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Capsules</h2>
        <div className="space-y-4">
          {myCapsules.length > 0 ? myCapsules.map(capsule => (
            <div key={capsule.id} className="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{capsule.title}</p>
                <p className="text-sm text-gray-500">
                  {capsule.creatorId === currentUser.id ? `To: ${users.find(u => u.id === capsule.recipientId)?.name}` : `From: ${users.find(u => u.id === capsule.creatorId)?.name}`}
                </p>
                <p className="text-sm text-gray-500">Unlocks on: {capsule.releaseDate}</p>
              </div>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${capsule.status === 'Sealed' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                {capsule.status}
              </span>
            </div>
          )) : (
            <p className="text-gray-500">You haven't created or received any time capsules yet.</p>
          )}
        </div>
      </div>
      
      {showCreateModal && <CreateCapsuleModal users={users} currentUser={currentUser} onClose={() => setShowCreateModal(false)} onCreate={(newCapsule) => {
          setTimeCapsules(prev => [...prev, newCapsule]);
          setShowCreateModal(false);
      }} />}
    </div>
  );
};

interface CreateCapsuleModalProps {
    users: AnyUser[];
    currentUser: AnyUser;
    onClose: () => void;
    onCreate: (capsule: TimeCapsule) => void;
}

const CreateCapsuleModal: React.FC<CreateCapsuleModalProps> = ({ users, currentUser, onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [recipientId, setRecipientId] = useState<string>('');
    const [releaseDate, setReleaseDate] = useState('');
    const [message, setMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');

    const handleCreate = () => {
        if (!title || !recipientId || !releaseDate || !message) {
            setError('Please fill all fields');
            return;
        }
        setError('');
        const newCapsule: TimeCapsule = {
            id: Date.now(),
            title,
            creatorId: currentUser.id,
            recipientId: parseInt(recipientId),
            releaseDate,
            status: 'Sealed',
            createdAt: new Date().toISOString().split('T')[0],
        };
        // In a real app, you'd also save the message content.
        onCreate(newCapsule);
    };

    const generateMessageIdea = async () => {
        if (!process.env.API_KEY) {
            setError("API_KEY environment variable not set.");
            return;
        }
        setIsGenerating(true);
        setError('');
        try {
            // FIX: Use new GoogleGenAI({apiKey: ...}) as per guidelines.
            const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
            // FIX: Use ai.models.generateContent and 'gemini-2.5-flash' model as per guidelines.
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Write a short, encouraging time capsule message from me (${currentUser.name}, a ${currentUser.role}) to a friend. The message is for a time capsule. Keep it under 50 words.`,
            });
            // FIX: Access the generated text directly from `response.text` as per guidelines.
            const generatedText = response.text;
            setMessage(prev => prev ? `${prev}\n\n---\n\n${generatedText}` : generatedText);
        } catch (error) {
            console.error("Error generating message:", error);
            setError("Failed to generate message idea. Please check your API key and network connection.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Create a Time Capsule</h2>
                <div className="space-y-4">
                    <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded"/>
                    <select value={recipientId} onChange={e => setRecipientId(e.target.value)} className="w-full p-2 border rounded">
                        <option value="">Select Recipient</option>
                        {users.filter(u => u.id !== currentUser.id).map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Release Date</label>
                        <input type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} className="w-full p-2 border rounded mt-1"/>
                    </div>
                    <textarea placeholder="Your message..." value={message} onChange={e => setMessage(e.target.value)} rows={5} className="w-full p-2 border rounded"/>
                    <button onClick={generateMessageIdea} disabled={isGenerating} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded transition disabled:bg-gray-300">
                        {isGenerating ? 'Generating...' : '✨ Get AI suggestion'}
                    </button>
                    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition">Cancel</button>
                    <button onClick={handleCreate} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition">Seal Capsule</button>
                </div>
            </div>
        </div>
    );
}

export default TimeCapsulePage;
