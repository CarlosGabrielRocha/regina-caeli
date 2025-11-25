"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, X } from "lucide-react"

interface SubmitNotificationProps {
  isVisible: boolean
  title: string
  message: string
  onClose: () => void
}

export function SubmitNotification({ isVisible, title, message, onClose }: SubmitNotificationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Notification Card */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-gradient-to-r from-secondary to-accent rounded-lg p-6 shadow-lg border border-secondary/20">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}>
                    <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                  </motion.div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary-foreground mb-1">{title}</h3>
                  <p className="text-sm text-primary-foreground/90">{message}</p>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  aria-label="Close notification"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
